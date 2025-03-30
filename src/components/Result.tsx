import { motion } from "framer-motion";
import { Event } from "@/types/events";

interface ModalProps {
  title: string;
  date: string;
  content: string;
  options: Event["options"];
  onSelectOption: (optionIndex: number) => void;
  onClose: () => void;
}

export const Result = ({
  title,
  date,
  content,
  options = [],
  onSelectOption,
  onClose,
}: ModalProps) => {
  const year = date.split("-")[0];
  console.log("options: ", options);

  return (
    <motion.div
      key="first-view"
      className="flex w-full h-full"
      initial={{ x: 0 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="w-2/6 h-full relative overflow-y-auto bg-black">
        <div className="p-8 text-white">
          <button
            onClick={onClose}
            className="text-white transition-colors cursor-pointer"
          >
            Retour à la timeline
          </button>
          <p className="pt-6 text-2xl font-bold mb-2">{year}</p>
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <div className="prose prose-lg">
            <p>{content}</p>
          </div>
        </div>
      </div>
      {options.map((option, index) => (
        <div key={index} className="relative w-2/6 h-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${option.img})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="py-4 px-2">
                <div className="flex items-center justify-center transform transition hover:-translate-y-1 ">
                  <div className="w-0 h-0 border-t-[34px] border-t-transparent border-b-[36px] border-b-transparent border-r-[22px] border-r-white" />
                  <button
                    onClick={() => onSelectOption(index)}
                    className="min-h-[72px] text-l font-bold text-black bg-white text-center px-9 py-5.5 line-clamp-2 overflow-hidden cursor-pointer"
                  >
                    {option.title}
                  </button>
                  <div className="w-0 h-0 border-t-[34px] border-t-transparent border-b-[36px] border-b-transparent border-l-[22px] border-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};
