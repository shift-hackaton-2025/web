import { motion } from "framer-motion";
import { Option } from "@/types/events";

interface ModalProps {
  date: string;
  selectedOption: Option;
  resultIsReady: boolean;
  onClose: () => void;
}

export const Result = ({
  date,
  selectedOption,
  resultIsReady,
  onClose,
}: ModalProps) => {
  const year = date.split("-")[0];
  console.log("selectedOption: ", selectedOption);

  return (
    <motion.div
      key="second-view"
      className="fixed inset-0 w-full h-full"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-full relative bg-black text-white">
        <div
          className="flex-1 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://uchronianh-g4bxcccwbqf8dmhe.francecentral-01.azurewebsites.net/${selectedOption.img})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-10 left-0 right-0 p-8 text-white/90 text-xl max-w-[50%] mx-auto">
            <p className="pt-6 text-3xl font-bold mb-2">{year}</p>
            <h2 className="text-4xl font-bold mb-6">{selectedOption.title}</h2>
            <p className="text-white text-base mb-6">
              {selectedOption.consequence}
            </p>
            <button
              {...(resultIsReady && { onClick: onClose })}
              className="text-white border border-white rounded-full px-6 py-2 transition-colors cursor-pointer text-base hover:bg-white hover:text-black"
            >
              {!resultIsReady
                ? "Chargement du multivers..."
                : "Voir les répercussions"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
