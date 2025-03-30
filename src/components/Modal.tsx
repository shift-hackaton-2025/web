import { motion, AnimatePresence } from "framer-motion";
import { Event } from "@/types/events";
import { Path } from "./Path";
import { Result } from "./Result";
import { UpdateEventsResult } from "@/services/api";
import { useState } from "react";
interface ModalProps {
  title: string;
  date: string;
  content: string;
  options?: Event["options"];
  onClose: () => void;
  onFinish: (optionIndex: number) => void;
  generatedResults?: UpdateEventsResult[];
}

export const Modal = ({
  title,
  date,
  content,
  options = [],
  onClose,
  onFinish,
  generatedResults,
}: ModalProps) => {
  const [selectOptionIndex, setSelectOptionIndex] = useState<
    number | undefined
  >();

  return (
    <AnimatePresence key="main-modal">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
      >
        <div className="flex h-full overflow-hidden">
          <AnimatePresence key="screen-modal">
            <Path
              title={title}
              date={date}
              content={content}
              options={options}
              onClose={onClose}
              onSelectOption={setSelectOptionIndex}
            />
            {typeof selectOptionIndex === "number" && (
              <Result
                date={date}
                selectedOption={options[selectOptionIndex]}
                resultIsReady={
                  selectOptionIndex !== undefined &&
                  !!generatedResults &&
                  !!generatedResults[selectOptionIndex]?.events?.length
                }
                onClose={() => onFinish(selectOptionIndex)}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
