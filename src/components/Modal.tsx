import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  onClose: () => void;
  onAction2: () => void;
  action1Text: string;
  action2Text: string;
}

export const Modal = ({
  title,
  date,
  imageUrl,
  content,
  onClose,
  onAction2,
  action2Text,
}: ModalProps) => {
  // Block scroll immediately when modal mounts
  document.body.style.overflow = "hidden";

  const year = date.split("-")[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
      >
        <div className="flex h-full gap-8 p-8">
          <div className="w-2/6 h-full relative">
            <div className="bg-black rounded-lg">
              <div className="p-8">
                <p className="text-xl text-white font-bold mb-2">{year}</p>
                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                <div className="prose prose-lg mb-12">
                  <p>{content}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={onClose}
                    className=" text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Retour
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-2/6 h-full rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center">
              <button
                onClick={onAction2}
                className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                {action2Text}
              </button>
            </div>
          </div>
          <div className="relative w-2/6 h-full rounded-lg overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center">
              <button
                onClick={onAction2}
                className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition-colors"
              >
                {action2Text}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
