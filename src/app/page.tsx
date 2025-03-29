"use client";

import { Slider } from "@/components/Slider";
import { events } from "@/mock/events";
import { Timeline } from "@/components/Timeline";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white overflow-hidden relative flex items-center justify-center">
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <h1 className="text-2xl font-bold text-center">uchron.ia</h1>
      </header>
      <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center">
        {/* <div className="w-full h-[4px] bg-white" /> */}
        <Timeline />
      </div>
      <main className="w-full">
        <Slider initialCards={events} />
      </main>
    </div>
  );
}
