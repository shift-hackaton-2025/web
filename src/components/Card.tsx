import { motion } from "framer-motion";

interface CardProps {
  title: string;
  date: string;
  imageUrl: string;
  onClick: () => void;
}

export const Card = ({ title, date, imageUrl, onClick }: CardProps) => {
  return (
    <motion.div
      className="relative w-[400px] h-full rounded-lg overflow-hidden flex-shrink-0 shadow-2xl cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        backfaceVisibility: "hidden",
      }}
      whileHover={{
        y: -10,
        zIndex: 10,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <h2 className="text-3xl font-bold mb-3">{title}</h2>
        <p className="text-lg opacity-80">{date}</p>
      </div>
    </motion.div>
  );
};
