"use client";

import { useRef, useState, useEffect } from "react";
import { events } from "@/mock/events";
import SliderItem from "./SliderItem";
import styles from "./slider.module.css";

export const Slider = () => {
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

  return (
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
        {events.map((event) => (
          <SliderItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
