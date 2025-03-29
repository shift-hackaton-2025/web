import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./beam.module.css";

interface BeamProps {
  className?: string;
}

const Beam = ({ className }: BeamProps) => {
  const meteorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const meteor = meteorRef.current;
    if (!meteor) return;

    meteor.addEventListener("animationend", () => {
      meteor.style.visibility = "hidden";
      const animationDelay = Math.floor(Math.random() * (3 - 0) + 0);
      const animationDuration = Math.floor(Math.random() * (4 - 0) + 0);
      const meteorWidth = Math.floor(Math.random() * (100 - 20) + 20);
      meteor.style.setProperty("--meteor-delay", `${animationDelay}s`);
      meteor.style.setProperty("--meteor-duration", `${animationDuration}s`);
      meteor.style.setProperty("--meteor-width", `${meteorWidth}px`);

      restartAnimation();
    });

    meteor.addEventListener("animationstart", () => {
      meteor.style.visibility = "visible";
    });

    return () => {
      if (!meteor) return;
      meteor.removeEventListener("animationend", () => {});
      meteor.removeEventListener("animationstart", () => {});
    };
  }, []);

  const restartAnimation = () => {
    const meteor = meteorRef.current;
    if (!meteor) return;
    meteor.style.animation = "none";
    void meteor.offsetWidth;
    meteor.style.animation = "";
  };

  return (
    <span
      ref={meteorRef}
      className={twMerge(
        "absolute z-[40]    h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg]",
        styles.meteor,
        className
      )}
    ></span>
  );
};

export default Beam;
