import Beam from "./Beam";
import { motion } from "framer-motion";

export const Timeline = () => {
  return (
    <div
      className="w-full"
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0 }}
        variants={{
          hidden: { opacity: 0, y: 0, scale: 1, rotateX: 45 },
          visible: {
            opacity: 1,
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            rotateX: 0,
          },
        }}
        className="h-[6px] w-full bg-gradient-to-br from-slate-800 to-slate-800/[0.9] relative overflow-hidden"
      >
        {/* Two Beams that run on top of the container */}
        <Beam className="top-0" />
        <Beam className="top-0" />

        {/* A bottom gradient that looks cute */}
        <div className="z-0 ">
          <div className="absolute bottom-0 right-4 mt-[2px] flex h-8 items-end overflow-hidden">
            <div className="flex -mb-px h-[2px] w-80 -scale-x-100">
              <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
              <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
