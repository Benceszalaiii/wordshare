"use client";
import { motion } from "framer-motion";

export default function ScrollDownButton({
  className,
  outlineColor,
}: {
  className?: string,
  outlineColor?: string,
}) {
  return (
    <>
      <motion.button onClick={()=>{
        window.scrollTo({top: window.innerHeight, behavior: 'smooth'})
      }} className={`transition-all duration-500 ease-in-out ${className}`} animate={{scale: [1, 1.2], y: [0, 4]}} transition={{repeat: Infinity, duration: 2, repeatType: "mirror", ease: "easeInOut"}}>
          <motion.svg className={`w-6 h-6 ${outlineColor ? outlineColor : "text-gray-800 dark:text-white"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <motion.path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7"/>
          </motion.svg>
      </motion.button>
    </>
  );
}
