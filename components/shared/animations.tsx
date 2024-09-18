"use client";
import { motion } from "framer-motion";

export function BallAnimation({ x, y, scale, delay, duration, color }: { x: number, y: number, scale?: number[], delay?: number, duration?: number, color: string }) {
  return (
    <>
      <motion.div
        className={`h-32 w-32 rounded-full absolute ` + color}
        
        animate={{
            scale: scale || [1, 1.3, 1],
            x: [x + "vw", 100-x + "vw"],
            y: [y + "vh", 100-y + "vh"],
        }}
        transition={{
          duration: duration || 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: delay || 2,
        }}
      />
    </>
  );
}
