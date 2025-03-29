"use client";

import Image from "next/image";
import { useState } from "react";

interface SliderItemProps {
  event: {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    content: string;
  };
}

const SliderItem = ({ event }: SliderItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    } catch {
      return dateString; // Fallback to the original string if parsing fails
    }
  };

  return (
    <div
      className="flex flex-col h-full w-[342px] rounded-lg overflow-hidden bg-gray-100 shadow-lg transition-transform duration-300 ease-in-out"
      style={{ transform: isHovered ? "scale(1.02)" : "scale(1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with date */}
      <div className="p-4 bg-gray-800 text-white">
        <h3 className="text-sm font-medium">{formatDate(event.date)}</h3>
      </div>

      {/* Content with background image */}
      <div
        className="flex-grow relative overflow-hidden"
        style={{ minHeight: "300px" }}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        >
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="342px"
            style={{
              objectFit: "cover",
              transition: "transform 0.5s ease-in-out",
            }}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
        </div>
        <div className="relative h-full flex items-end p-4 z-10">
          <p
            className={`text-white text-sm transition-opacity duration-300 ${
              isHovered ? "line-clamp-none" : "line-clamp-3"
            }`}
          >
            {event.content}
          </p>
        </div>
      </div>

      {/* Footer with title */}
      <div className="p-4 bg-white border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">{event.title}</h2>
      </div>
    </div>
  );
};

export default SliderItem;
