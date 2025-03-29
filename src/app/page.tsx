"use client";

import { Slider } from "@/components/Slider";
import { Timeline } from "@/components/Timeline";
import { useEffect, useState } from "react";
import { Event } from "@/types/events";
import { fetchInitialEvents } from "@/services/api";
import { Logo } from "@/components/Logo";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchInitialEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] flex items-center justify-center">
        <Logo />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-white overflow-hidden relative flex items-center justify-center">
      {/* <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <h1 className="text-2xl font-bold text-center">uchron.ia</h1>
      </header> */}
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
