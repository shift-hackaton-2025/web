import { motion, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";
import { Event } from "@/types/events";

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

  const handleCreateNewEntry = () => {
    if (!selectedCard) return;

    const newCard: Event = {
      id: `${Date.now()}`,
      title: "New Event",
      date: new Date().toISOString().split("T")[0],
      image: selectedCard.image,
      options: [],
    };

    // Find the index of the selected card
    const selectedIndex = cards.findIndex(
      (card) => card.id === selectedCard.id
    );

    // Insert the new card after the selected card
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards.splice(selectedIndex + 1, 0, newCard);
      return newCards;
    });

    setSelectedCard(null);
  };

  const onCreateNewEvent = () => {};

  return (
    <div className="w-full h-[80vh] mx-auto">
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
          {cards.map((card, index) => (
            <motion.div key={card.id} className="relative touch-none h-full">
              <Card
                title={card.title}
                date={card.date}
                // imageUrl={card.image}
                imageUrl={`https://picsum.photos/800/1200?random=${index}`}
                onClick={() => setSelectedCard(card)}
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
