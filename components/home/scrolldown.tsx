"use client";
import { motion } from "framer-motion";

export default function ScrollDownButton({
    className,
    outlineColor,
}: {
    className?: string;
    outlineColor?: string;
}) {
    return (
        <>
            <button
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight,
                        behavior: "smooth",
                    });
                }}
                className={`${className} flex flex-col items-center gap-3`}
            >
                <p>Scroll down for more information</p>
                <svg
                    className={`h-8 w-8 text-gray-800 dark:text-white motion-delay-1000 motion-safe:motion-scale-in-125 animate-alternate motion-ease-linear motion-duration-2000 animate-infinite`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m19 9-7 7-7-7"
                    />
                </svg>
            </button>
        </>
    );
}
