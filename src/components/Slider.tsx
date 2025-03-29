import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Event } from "@/types/events";
import { updateEvents } from "@/services/api";

interface SliderProps {
  initialCards: Event[];
}

export const Slider = ({ initialCards }: SliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cards, setCards] = useState<Event[]>(initialCards);
  const [maxScroll, setMaxScroll] = useState(0);
  const [selectedCard, setSelectedCard] = useState<Event | null>(null);
  const x = useMotionValue(0);

  // Calculate total width needed for all cards plus padding
  const cardWidth = 332; // Width of each card
  const cardGap = 32; // Gap between cards

  // Total width calculation - we only need one side padding since the container already has padding
  const totalWidth = cards.length * (cardWidth + cardGap) + cardGap;

  // Update x when scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      x.set(-container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [x]);

  // Update scroll when x changes
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = -latest;
      }
    });
    return () => unsubscribe();
  }, [x]);

  useEffect(() => {
    if (containerRef.current) {
      const updateSizes = () => {
        const container = containerRef.current;
        if (container) {
          const adjustedMaxScroll = Math.max(
            0,
            totalWidth - container.clientWidth + cardGap
          );
          setMaxScroll(adjustedMaxScroll);
        }
      };

      updateSizes();
      window.addEventListener("resize", updateSizes);
      return () => window.removeEventListener("resize", updateSizes);
    }
  }, [cards, totalWidth, cardGap]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current) {
        const container = containerRef.current;

        if (maxScroll <= 0) {
          e.preventDefault();
          return;
        }

        if (
          (container.scrollLeft > 0 && container.scrollLeft < maxScroll) ||
          (container.scrollLeft === 0 && e.deltaY > 0) ||
          (container.scrollLeft === maxScroll && e.deltaY < 0)
        ) {
          e.preventDefault();
        }

        const newScrollLeft = container.scrollLeft + e.deltaY;
        const clampedScroll = Math.max(0, Math.min(newScrollLeft, maxScroll));
        container.scrollLeft = clampedScroll;
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [maxScroll]);

  const onCreateNewEvent = async (optionIndex: number) => {
    if (!selectedCard) return;

    try {
      const optionChosen = `${selectedCard.id}_${optionIndex}`;
      const response = await updateEvents({
        events: cards,
        option_chosen: optionChosen,
        model: "gpt-4",
        temperature: 0.7,
      });

      // Find the index of the current card
      const currentCardIndex = cards.findIndex(
        (card) => card.id === selectedCard.id
      );

      // Update the selected card's image with the chosen option's image
      const updatedCards = [...cards];
      updatedCards[currentCardIndex] = {
        ...updatedCards[currentCardIndex],
        image: selectedCard.options[optionIndex].option_img_link,
        title: selectedCard.options[optionIndex].title,
        disabled: true,
      };

      // Create new cards array with:
      // 1. All cards up to and including the current card (with updated image)
      // 2. The new cards from the response
      const newCards = [
        ...updatedCards.slice(0, currentCardIndex + 1),
        ...response,
      ];

      setCards(newCards);
      setSelectedCard(null);
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };

  return (
    <div className="w-screen h-screen mx-auto">
      <div
        ref={containerRef}
        className="w-full overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing h-full py-[70px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex gap-8 px-8 h-full relative items-center"
          style={{
            width: `${totalWidth}px`,
            x,
          }}
          drag="x"
          dragConstraints={{
            left: -maxScroll,
            right: 0,
          }}
          dragElastic={0}
          dragMomentum={false}
          onDragStart={() => {
            if (containerRef.current) {
              containerRef.current.style.overflowX = "hidden";
            }
          }}
          onDragEnd={() => {
            if (containerRef.current) {
              containerRef.current.style.overflowX = "auto";
              const currentX = x.get();
              if (currentX > 0) {
                x.set(0);
              } else if (currentX < -maxScroll) {
                x.set(-maxScroll);
              }
            }
          }}
        >
          {cards.map((card) => (
            <motion.div key={card.id} className="relative touch-none h-full">
              <Card
                title={card.title}
                date={card.date}
                imageUrl={`https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${card.image}`}
                onClick={() => setSelectedCard(card)}
                disabled={card.disabled}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedCard && (
        <Modal
          title={selectedCard.title}
          date={selectedCard.date}
          content={selectedCard.options
            .map((opt) => opt.consequence)
            .join("\n\n")}
          onClose={() => setSelectedCard(null)}
          onCreateNewEvent={onCreateNewEvent}
          options={selectedCard.options}
        />
      )}
    </div>
  );
};
