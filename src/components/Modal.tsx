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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const year = date.split("-")[0];

  const handleCreateNewEvent = async (index: number) => {
    setLoadingIndex(index);
    setSelectedOption(index);
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
        <div className="flex h-full">
          <div className="w-2/6 h-full relative overflow-y-auto bg-black">
            <div className="p-8 text-white">
              <button
                onClick={onClose}
                className="text-white transition-colors cursor-pointer"
              >
                Retour à la timeline
              </button>
              <p className="pt-6 text-xl font-bold mb-2">{year}</p>
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <div className="prose prose-lg mb-12">
                <p>{content}</p>
              </div>
            </div>
          </div>
          {options.map((option, index) => (
            <div key={index} className="relative w-2/6 h-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${option.option_img_link})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="py-4 px-2">
                    <div className="flex items-center justify-center transform transition hover:-translate-y-1 ">
                      <div className="w-0 h-0 border-t-[36px] border-t-transparent border-b-[36px] border-b-transparent border-r-[22px] border-r-white" />
                      <button
                        onClick={() => handleCreateNewEvent(index)}
                        disabled={
                          loadingIndex !== null || selectedOption !== null
                        }
                        className="text-xl font-bold text-black bg-white text-center px-9 py-5.5 line-clamp-2 overflow-hidden cursor-pointer"
                      >
                        {option.title}
                      </button>
                      <div className="w-0 h-0 border-t-[36px] border-t-transparent border-b-[36px] border-b-transparent border-l-[22px] border-white" />
                    </div>
                  </div>
                  {selectedOption === index && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white/80 text-sm text-center max-w-[80%]"
                    >
                      {option.consequence}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
