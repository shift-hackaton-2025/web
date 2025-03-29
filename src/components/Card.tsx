import { motion } from "framer-motion";

interface CardProps {
  title: string;
  date: string;
  imageUrl: string;
  onClick: () => void;
}

export const Card = ({ title, date, imageUrl, onClick }: CardProps) => {
  // Extract year from date string (YYYY-MM-DD format)
  const year = date.split("-")[0];

  return (
    <div className="h-full relative">
      <div className="absolute top-[212px] right-[-17px] w-[4px] h-[32px] bg-white" />
      <motion.div
        className={`flex flex-col w-[332px] h-full rounded-lg overflow-hidden flex-shrink-0 shadow-2xl cursor-pointer`}
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
        <p className="text-lg font-bold text-white text-center pb-2">{year}</p>
        <div className="relative rounded-lg overflow-hidden flex-shrink-0 shadow-2xl w-full grow">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h2 className="text-xl font-bold mb-3">{title}</h2>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
