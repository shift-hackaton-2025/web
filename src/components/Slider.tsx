"use client";

import { useRef, useState, useEffect } from "react";
import SliderItem from "./SliderItem";
import styles from "./slider.module.css";
import { Modal } from "./Modal";
import { Event } from "@/types/events";
import { updateEvents, type UpdateEventsResult } from "@/services/api";

export const Slider = ({ events }: { events: Event[] }) => {
  const [selectedCard, setSelectedCard] = useState<Event | null>(null);
  const [imageTasks, setImageTasks] = useState<
    {
      event_id: string;
      task_id: string;
    }[]
  >([]);
  const [cards, setCards] = useState<Event[]>(events);
  const [generatedResults, setGeneratedResults] = useState<
    UpdateEventsResult[]
  >([]);

  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // Handle mouse down event for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setStartY(e.pageY - (sliderRef.current?.offsetTop || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
    setScrollTop(sliderRef.current?.scrollTop || 0);
  };

  // Handle mouse move event for dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    if (sliderRef.current) {
      const x = e.pageX - (sliderRef.current.offsetLeft || 0);
      const y = e.pageY - (sliderRef.current.offsetTop || 0);
      const walkX = (x - startX) * 2; // Multiply for faster scrolling
      const walkY = (y - startY) * 2;

      sliderRef.current.scrollLeft = scrollLeft - walkX;
      sliderRef.current.scrollTop = scrollTop - walkY;
    }
  };

  // Handle mouse up event for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle wheel event to transform both vertical and horizontal scroll to slider movement
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (sliderRef.current) {
      // Convert both vertical (deltaY) and horizontal (deltaX) scroll to horizontal movement
      sliderRef.current.scrollLeft += e.deltaY + e.deltaX;
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX - (sliderRef.current?.offsetLeft || 0));
      setStartY(e.touches[0].clientY - (sliderRef.current?.offsetTop || 0));
      setScrollLeft(sliderRef.current?.scrollLeft || 0);
      setScrollTop(sliderRef.current?.scrollTop || 0);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    if (sliderRef.current) {
      const x = e.touches[0].clientX - (sliderRef.current.offsetLeft || 0);
      const y = e.touches[0].clientY - (sliderRef.current.offsetTop || 0);
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;

      sliderRef.current.scrollLeft = scrollLeft - walkX;
      sliderRef.current.scrollTop = scrollTop - walkY;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    document.addEventListener("touchend", handleTouchEnd);

    // Add wheel event listener to enable vertical scroll to horizontal conversion
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [isDragging, startX, startY, scrollLeft, scrollTop]);

  const onSelectOption = async (optionIndex: number) => {
    if (!selectedCard) return;

    const selectedResult = generatedResults[optionIndex];

    try {
      // Find the index of the current card
      const currentCardIndex = cards.findIndex(
        (card) => card.id === selectedCard.id
      );

      // Update the selected card's image with the chosen option's image
      const updatedCards = [...cards];
      updatedCards[currentCardIndex] = {
        ...updatedCards[currentCardIndex],
        title: selectedCard.options[optionIndex].title,
        image: selectedCard.options[optionIndex].img,
        isDone: true,
      };

      const newCards = [
        ...updatedCards.slice(0, currentCardIndex + 1),
        ...selectedResult.events,
      ];

      setCards(newCards);
      setImageTasks(
        selectedResult.image_tasks.filter(
          (task) => task.event_id !== selectedCard.id
        )
      );
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };

  const generateResults = async () => {
    if (!selectedCard) return;

    try {
      const promises = selectedCard.options.map((option, index) => {
        const optionChosen = `${selectedCard.id}_${index}`;
        return updateEvents({
          events: cards,
          option_chosen: optionChosen,
          model: "gpt-4o",
          temperature: 0.7,
        });
      });

      const results = await Promise.all(promises);
      setGeneratedResults(results);
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };

  useEffect(() => {
    generateResults();
  }, [selectedCard]);

  return (
    <>
      <div className={styles.sliderWrapper}>
        <div
          ref={sliderRef}
          className={`${styles.slider} ${styles.scrollContainer} ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          style={{
            overscrollBehavior: "contain",
          }}
        >
          {cards.map((card) => (
            <SliderItem
              key={card.id}
              event={card}
              imageTask={imageTasks.find((task) => {
                console.log("task.event_id: ", task.event_id);
                console.log("card.id: ", card.id);
                return task.event_id === card.id;
              })}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>
      </div>
      {selectedCard && (
        <Modal
          title={selectedCard.title}
          date={selectedCard.date}
          content={selectedCard.description}
          generatedResults={generatedResults}
          onClose={() => setSelectedCard(null)}
          onFinish={onSelectOption}
          options={selectedCard.options}
        />
      )}
    </>
  );
};
