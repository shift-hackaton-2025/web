"use client";

import { useRef, useState, useEffect } from "react";
import SliderItem from "./SliderItem";
import styles from "./slider.module.css";
import { Modal } from "./Modal";
import { Event } from "@/types/events";
import { updateEvents } from "@/services/api";
import { json } from "stream/consumers";

export const Slider = ({ events }: { events: Event[] }) => {
  const [selectedCard, setSelectedCard] = useState<Event | null>(null);
  const [imageTasks, setImageTasks] = useState<
    {
      event_id: string;
      task_id: string;
    }[]
  >([]);
  const [cards, setCards] = useState<Event[]>(events);

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

  const onCreateNewEvent = async (optionIndex: number) => {
    if (!selectedCard) return;

    try {
      const optionChosen = `${selectedCard.id}_${optionIndex}`;
      const response = await updateEvents({
        events: cards,
        option_chosen: optionChosen,
        model: "gpt-4o",
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
        title: selectedCard.options[optionIndex].title,
        image: selectedCard.options[optionIndex].img,
        isDone: true,
      };

      console.log("response.events: ", response.events);

      const newCards = [
        ...updatedCards.slice(0, currentCardIndex + 1),
        ...response.events,
      ];

      console.log("newCards: ", newCards);

      setCards(newCards);
      setImageTasks(
        response.image_tasks.filter((task) => task.event_id !== selectedCard.id)
      );
    } catch (error) {
      console.error("Error updating events:", error);
    }
  };

  console.log("imageTasks: ", imageTasks);

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
          <SliderItem
            key="exit-card"
            event={{
              id: "exit",
              title: "Exit Story",
              description: "Click here to exit the story",
              date: " ",
              image: "data/images_default/exit_image.png",
              isDone: false,
              options: []
            }}
            onClick={async () => {
              try {                
                const eventsToSend = cards.filter(card => card.id !== "exit");
                // Filter out any non-event cards and map to the required format
                const formattedEvents = eventsToSend.map(card => ({
                  id: card.id || "",
                  title: card.title || "",
                  description: card.description || "",
                  image: card.image || "",
                  date: card.date || "",
                  music_file: card.music_file || "",
                  options: Array.isArray(card.options) ? card.options.map(option => ({
                    title: option.title || "",
                    consequence: Array.isArray(option.consequence) ? option.consequence : ["", "", ""],
                    img: option.img || "",
                    music_file: option.music_file || ""
                  })) : []
                }));
                  
                // Create and show loading element
                const loaderElement = document.createElement('div');
                loaderElement.className = 'fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center';
                loaderElement.innerHTML = `
                  <div class="flex flex-col items-center">
                    <div class="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p class="text-white mt-4">Generating your story summary...</p>
                  </div>
                `;
                document.body.appendChild(loaderElement);

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `https://uchronia-backend.deploymate.xyz/exit_game`, true);
                xhr.setRequestHeader("Content-Type", "application/json");
                console.log("eventsToSend: ", formattedEvents);
                xhr.send(JSON.stringify({ formattedEvents }));
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    // Remove loader
                    document.body.removeChild(loaderElement);
                    console.log("xhr.status: ", xhr.status);
                    if (xhr.status === 200) {
                      console.log("Success:", xhr.responseText);
                      const { description: summary } = JSON.parse(xhr.responseText);
                      console.log("Generation de la synthèse du jeu:", summary);
                      // Show the summary modal
                      const summaryElement = document.createElement('div');
                      summaryElement.className = 'fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center';
                      
                      const content = `
                        <div class="bg-white/10 p-8 rounded-lg max-w-2xl w-full mx-4">
                          <h2 class="text-3xl font-bold text-white mb-6">Fin du jeu</h2>
                          <div class="prose prose-lg text-white mb-8">
                            <p>${"Merci d'avoir joué!"}</p>
                          </div>
                          <div class="flex justify-center">
                            <button 
                              class="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                              onclick="window.location.reload()"
                            >
                              Rejouer
                            </button>
                          </div>
                        </div>
                      `;
                      
                      summaryElement.innerHTML = content;
                      document.body.appendChild(summaryElement);
                    } else {
                      console.error("Error status:", xhr.status);
                      console.error("Response:", xhr.responseText);
                      
                      const summaryElement = document.createElement('div');
                      summaryElement.className = 'fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center';
                      
                      const content = `
                        <div class="bg-white/10 p-8 rounded-lg max-w-2xl w-full mx-4">
                          <h2 class="text-3xl font-bold text-white mb-6">Fin du jeu</h2>
                          <div class="prose prose-lg text-white mb-8">
                            <p>${ "Thank you for playing!"}</p>
                          </div>
                          <div class="flex justify-center">
                            <button 
                              class="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                              onclick="window.location.reload()"
                            >
                              Rejouer
                            </button>
                          </div>
                        </div>
                      `;

                      summaryElement.innerHTML = content;
                      document.body.appendChild(summaryElement);
                    }
                  }
                };
                
              } catch (error) {
                console.error("Error in exit game function:", error);

              }
            }}
          />
        </div>
      </div>
      {selectedCard && (
        <Modal
          title={selectedCard.title}
          date={selectedCard.date}
          content={selectedCard.description}
          onClose={() => setSelectedCard(null)}
          onCreateNewEvent={onCreateNewEvent}
          options={selectedCard.options}
          music_file={selectedCard.music_file}
        />
      )}
    </>
  );
};
