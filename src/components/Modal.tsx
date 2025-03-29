import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@/types/events";
import { useState } from "react";

interface ModalProps {
  title: string;
  date: string;
  content: string;
  onClose: () => void;
  onCreateNewEvent: (optionIndex: number) => void;
  options?: Event["options"];
}

export const Modal = ({
  title,
  date,
  content,
  onClose,
  onCreateNewEvent,
  options = [],
}: ModalProps) => {
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  // Block scroll immediately when modal mounts
  document.body.style.overflow = "hidden";

  const year = date.split("-")[0];

  const handleCreateNewEvent = async (index: number) => {
    setLoadingIndex(index);
    try {
      await onCreateNewEvent(index);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
      >
        <div className="flex h-full gap-8 p-8">
          <div className="w-2/6 h-full relative overflow-y-auto bg-black rounded-lg">
            <div className="p-8">
              <p className="text-xl text-white font-bold mb-2">{year}</p>
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <div className="prose prose-lg mb-12">
                <p>{content}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Retour
                </button>
              </div>
            </div>
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              className="relative w-2/6 h-full rounded-lg overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${option.option_img_link})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex justify-center">
                  <button
                    onClick={() => handleCreateNewEvent(index)}
                    disabled={loadingIndex !== null}
                    className="px-6 py-3 border rounded-lg hover:bg-white-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {option.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
