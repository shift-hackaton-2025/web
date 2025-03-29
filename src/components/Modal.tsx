import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  onAction1: () => void;
  onAction2: () => void;
  action1Text: string;
  action2Text: string;
}

export const Modal = ({
  title,
  date,
  imageUrl,
  content,
  onAction1,
  onAction2,
  action1Text,
  action2Text,
}: ModalProps) => {
  // Block scroll immediately when modal mounts
  document.body.style.overflow = "hidden";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50"
      >
        <div className="flex h-full">
          {/* Image Column (3/5) */}
          <div className="w-3/5 h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Content Column (2/5) */}
          <div className="w-2/5 h-full bg-white overflow-y-auto">
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">{title}</h2>
              <p className="text-xl text-gray-600 mb-8">{date}</p>
              <div className="prose prose-lg mb-12">
                <p>{content}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={onAction1}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  {action1Text}
                </button>
                <button
                  onClick={onAction2}
                  className="px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {action2Text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
