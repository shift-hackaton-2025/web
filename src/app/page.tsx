"use client";

import { Slider } from "@/components/Slider";
import { events } from "@/mock/events";
export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden relative flex items-center justify-center">
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">uchron.ia</h1>
        </div>
      </header>
      <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center">
        <div className="w-full h-[4px] bg-white" />
      </div>
      <main className="w-full">
        <Slider cards={events} />
      </main>
    </div>
  );
}
