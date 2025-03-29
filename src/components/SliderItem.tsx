"use client";

import Image from "next/image";
import { useState } from "react";
import { Settings } from "lucide-react";

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
    <div className="flex flex-col h-full w-[350px] rounded-lg overflow-hidden transition-transform duration-300 ease-in-out py-4 px-1">
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
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="342px"
            className="object-cover transition-transform duration-500 ease-in-out"
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70" />
        </div>
        {/* <div className="relative h-full flex items-end p-4 z-10">
          <p className={`text-white text-sm transition-opacity duration-300`}>
            {event.content}
          </p>
        </div> */}
        <div className="group absolute bottom-0 left-0 right-0 flex items-start justify-center cursor-pointer">
          <div className="w-0 h-0 border-t-[41px] border-t-transparent border-b-[0px] border-b-transparent border-r-[22px] border-r-black" />
          <div className="py-2 bg-black w-full flex items-center justify-center">
            <Settings className="text-white bg-black w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          </div>
          <div className="w-0 h-0 border-t-[41px] border-t-transparent border-b-[0px] border-b-transparent border-l-[22px] border-black" />
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
