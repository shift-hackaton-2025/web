"use client";

import { Slider } from "@/components/Slider";

const sampleCards = [
  {
    id: "1",
    title: "The First Event",
    date: "2024-03-20",
    imageUrl: "https://picsum.photos/800/1200?random=1",
    content:
      "This is a significant milestone in our journey. The first event marks the beginning of a new era in technological advancement.",
  },
  {
    id: "2",
    title: "Another Milestone",
    date: "2024-03-21",
    imageUrl: "https://picsum.photos/800/1200?random=2",
    content:
      "We've reached another important milestone in our development. This achievement demonstrates our commitment to innovation.",
  },
  {
    id: "3",
    title: "Future Vision",
    date: "2024-03-22",
    imageUrl: "https://picsum.photos/800/1200?random=3",
    content:
      "Our vision for the future takes shape. This event showcases our roadmap for upcoming technological breakthroughs.",
  },
  {
    id: "4",
    title: "Digital Revolution",
    date: "2024-03-23",
    imageUrl: "https://picsum.photos/800/1200?random=4",
    content:
      "The digital revolution continues to evolve. This milestone represents our contribution to the transformation of technology.",
  },
  {
    id: "5",
    title: "AI Breakthrough",
    date: "2024-03-24",
    imageUrl: "https://picsum.photos/800/1200?random=5",
    content:
      "A major breakthrough in artificial intelligence has been achieved. This development opens new possibilities for the future.",
  },
  {
    id: "6",
    title: "Quantum Leap",
    date: "2024-03-25",
    imageUrl: "https://picsum.photos/800/1200?random=6",
    content:
      "We've made a quantum leap in our technological capabilities. This advancement represents a significant step forward.",
  },
  {
    id: "7",
    title: "Virtual Reality",
    date: "2024-03-26",
    imageUrl: "https://picsum.photos/800/1200?random=7",
    content:
      "Virtual reality technology reaches new heights. This development brings us closer to immersive digital experiences.",
  },
  {
    id: "8",
    title: "Neural Network",
    date: "2024-03-27",
    imageUrl: "https://picsum.photos/800/1200?random=8",
    content:
      "Our neural network architecture has been significantly improved. This enhancement enables more sophisticated AI capabilities.",
  },
  {
    id: "9",
    title: "Cyber Evolution",
    date: "2024-03-28",
    imageUrl: "https://picsum.photos/800/1200?random=9",
    content:
      "The evolution of cybersecurity continues. This update strengthens our defenses against emerging digital threats.",
  },
  {
    id: "10",
    title: "Digital Horizon",
    date: "2024-03-29",
    imageUrl: "https://picsum.photos/800/1200?random=10",
    content:
      "We're pushing the boundaries of what's possible in the digital realm. This achievement sets new standards for innovation.",
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
