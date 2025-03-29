"use client";

import { Slider } from "@/components/Slider";

const sampleCards = [
  {
    id: "1",
    title: "The First Event",
    date: "2024-03-20",
    imageUrl: "https://picsum.photos/800/1200?random=1",
  },
  {
    id: "2",
    title: "Another Milestone",
    date: "2024-03-21",
    imageUrl: "https://picsum.photos/800/1200?random=2",
  },
  {
    id: "3",
    title: "Future Vision",
    date: "2024-03-22",
    imageUrl: "https://picsum.photos/800/1200?random=3",
  },
  {
    id: "4",
    title: "Digital Revolution",
    date: "2024-03-23",
    imageUrl: "https://picsum.photos/800/1200?random=4",
  },
  {
    id: "5",
    title: "AI Breakthrough",
    date: "2024-03-24",
    imageUrl: "https://picsum.photos/800/1200?random=5",
  },
  {
    id: "6",
    title: "Quantum Leap",
    date: "2024-03-25",
    imageUrl: "https://picsum.photos/800/1200?random=6",
  },
  {
    id: "7",
    title: "Virtual Reality",
    date: "2024-03-26",
    imageUrl: "https://picsum.photos/800/1200?random=7",
  },
  {
    id: "8",
    title: "Neural Network",
    date: "2024-03-27",
    imageUrl: "https://picsum.photos/800/1200?random=8",
  },
  {
    id: "9",
    title: "Cyber Evolution",
    date: "2024-03-28",
    imageUrl: "https://picsum.photos/800/1200?random=9",
  },
  {
    id: "10",
    title: "Digital Horizon",
    date: "2024-03-29",
    imageUrl: "https://picsum.photos/800/1200?random=10",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-hidden relative flex items-center justify-center">
      <header className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold">uchron.ia</h1>
        </div>
      </header>
      <main className="w-full">
        <Slider cards={sampleCards} />
      </main>
    </div>
  );
}
