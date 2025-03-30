"use client";

import Image from "next/image";
import { useState } from "react";
import { Settings, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Event } from "@/types/events";

interface SliderItemProps {
  event: Event;
  onClick: () => void;
}

const SliderItem = ({ event, onClick }: SliderItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
      }).format(date);
    } catch {
      return dateString; // Fallback to the original string if parsing fails
    }
  };

  return (
    <div
      className="flex flex-col h-full w-[350px] rounded-lg overflow-hidden transition-transform duration-300 ease-in-out py-4 px-1"
      {...(!event.isDone && { onClick })}
    >
      <div className="p-4">
        <div className="flex items-center justify-center">
          <div className="w-0 h-0 border-t-[22px] border-t-transparent border-b-[22px] border-b-transparent border-r-[16px] border-r-white" />
          <h3 className="text-xl font-bold text-black bg-white text-center px-9 py-2">
            {formatDate(event.date)}
          </h3>
          <div className="w-0 h-0 border-t-[22px] border-t-transparent border-b-[22px] border-b-transparent border-l-[16px] border-white" />
        </div>
      </div>

      <div className="flex-grow relative overflow-hidden bg-black m-h-[300px]">
        <div
          className={` absolute inset-0 transition-all duration-500 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
        >
          <Image
            src={`https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${event.image}`}
            alt={event.title}
            fill
            sizes="342px"
            className="object-cover transition-transform duration-500 ease-in-out"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>
        <div
          className={cn(
            "absolute top-[calc(100%-40px)] left-0 right-0 flex flex-col h-full",
            {
              "top-0": isExpanded,
            }
          )}
        >
          <div
            className="group flex items-start justify-center cursor-pointer"
            {...(event.isDone && {
              onClick: () => {
                setIsExpanded(!isExpanded);
              },
            })}
          >
            <div
              className={clsx(
                "w-0 h-0 border-t-[40px] border-t-transparent border-b-[0px] border-b-transparent border-r-[22px] border-r-black opacity-60 group-hover:opacity-100 duration-300",
                { "opacity-100": isExpanded }
              )}
            />
            <div
              className={clsx(
                "py-2 bg-black w-full flex items-center justify-center opacity-60 group-hover:opacity-100 duration-300",
                { "opacity-100": isExpanded }
              )}
            >
              {event.isDone ? (
                <ChevronUp className="text-white bg-black w-6 h-6 transition-transform group-hover:rotate-180  duration-300" />
              ) : (
                <Settings className="text-white bg-black w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
              )}
            </div>
            <div
              className={clsx(
                "w-0 h-0 border-t-[40px] border-t-transparent border-b-[0px] border-b-transparent border-l-[22px] border-black opacity-60 group-hover:opacity-100 duration-300",
                { "opacity-100": isExpanded }
              )}
            />
          </div>
          {event.isDone && (
            <div className="bg-black flex-grow p-6">
              <p
                className={`text-white text-base transition-opacity duration-300`}
              >
                {event.description}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="py-4 px-2">
        <div className="flex items-center justify-center">
          <div className="w-0 h-0 border-t-[36px] border-t-transparent border-b-[36px] border-b-transparent border-r-[22px] border-r-white" />
          <h3 className="text-xl font-bold text-black bg-white text-center px-9 py-2 line-clamp-2 overflow-hidden">
            {event.title}
          </h3>
          <div className="w-0 h-0 border-t-[36px] border-t-transparent border-b-[36px] border-b-transparent border-l-[22px] border-white" />
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
