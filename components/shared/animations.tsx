"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BallAnimation({
  x,
  y,
  scale,
  delay,
  duration,
  color,
}: {
  x: number;
  y: number;
  scale?: number[];
  delay?: number;
  duration?: number;
  color: string;
}) {
  return (
    <>
      <motion.div
        className={`absolute h-32 w-32 rounded-full ` + color}
        animate={{
          scale: scale || [1, 1.3, 1],
          x: [x + "vw", 100 - x + "vw"],
          y: [y + "vh", 100 - y + "vh"],
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

export function Parallax() {
  const balls = [
    { x: 10, y: 20, color: "bg-red-500" },
    { x: 30, y: 40, color: "bg-blue-500" },
    { x: 50, y: 60, color: "bg-green-500" },
  ];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {balls.map((ball, index) => (
        <BallAnimation
          key={index}
          x={ball.x}
          y={ball.y + scrollY * 0.1}
          color={ball.color}
        />
      ))}
    </div>
  );
}
