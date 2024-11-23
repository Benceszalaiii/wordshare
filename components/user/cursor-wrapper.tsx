"use client";

import useCursorTheme from "@/lib/hooks/use-cursor-theme";
import { useMousePosition } from "@/lib/hooks/use-mouseposition";
import { motion } from "framer-motion";
import { useIsMobile } from "hooks/use-mobile";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function CursorWrapper({
    children,
    title,
    className,
    cursorColor,
}: {
    className?: string;
    title: string;
    children: React.ReactNode;
    cursorColor?: string;
}) {
    const { setTheme, setCursorDefault, defaultTheme } = useCursorTheme();
    return (
        <section
            onMouseEnter={() => {
                setTheme(cursorColor || defaultTheme);
            }}
            onMouseLeave={setCursorDefault}
            className={twMerge(
                "relative mt-8 flex w-full max-w-screen-md flex-col items-center justify-center gap-4 rounded-lg border border-border bg-white/30 bg-opacity-10 p-8 dark:bg-dark/30 md:gap-8 md:overflow-hidden",
                className,
            )}
        >
            <legend
                about="Legend"
                className="self-start text-lg font-semibold text-opacity-75 select-none -z-10 text-black/75 animate-in dark:text-white/75"
            >
                {title}
            </legend>

            {children}
        </section>
    );
}

export const CursorMotion = () => {
    const mousePos = useMousePosition();
    const isMobile = useIsMobile();
    return (
        <div
            className={`fixed left-0 top-0 -z-20 h-screen w-screen overflow-hidden`}
        >
            <motion.div
                hidden={isMobile || (mousePos.x === 0 && mousePos.y === 0)}
                className={`bg-cursor fixed h-28 w-28 rounded-xl opacity-55 blur-2xl transition-colors duration-700`}
                animate={{ x: mousePos.x, y: mousePos.y }}
            />
        </div>
    );
};
