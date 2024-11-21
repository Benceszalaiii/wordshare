"use client";
import { caveat, sfPro } from "@/app/fonts";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useIsMobile } from "hooks/use-mobile";
import * as React from "react";
export default function PokeCards({wordCount, essays, streak}: {wordCount: number, streak: number, essays: number}) {

    const [isHovered, setIsHovered] = React.useState(false);
    const cursorLeave = () => {
        setIsHovered(false);
    };
    const cursorEnter = () => {
        setIsHovered(true);
    };
    const [mousePos, setMousePos] = React.useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const cursorMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        setMousePos({ x: mouseX, y: mouseY });
    };
    const isMobile = useIsMobile();
    return (
        <section
            onMouseLeave={cursorLeave}
            onMouseMove={cursorMove}
            onMouseEnter={cursorEnter}
            className="relative flex flex-col items-center justify-center w-full max-w-screen-md gap-4 p-8 mt-8 border rounded-lg md:gap-8 md:overflow-hidden border-border"
        >
            <legend about="Legend" className="z-20 self-start text-lg font-semibold text-black text-opacity-75 select-none animate-in dark:text-white">Statistics</legend>
            <motion.div
                hidden={!isHovered || isMobile}
                className={`absolute h-32 w-32 -z-10 rounded-xl bg-violet-800 opacity-35 blur-2xl`}
                animate={{ x: mousePos.x, y: mousePos.y }}
            />
            <div className="flex flex-col items-center w-full gap-4 md:flex-row md:gap-8 justify-evenly">
            <TiltCard title="WordStreak" value={streak} unit="days" colorVariant="orange" />
            <TiltCard title="Words written" value={wordCount} unit="words" colorVariant="main" />
            <TiltCard title="Essays" value={essays} unit="essays" colorVariant="emerald" />
            </div>
        </section>
    );
}

export function TiltCard({title, value, unit, colorVariant = "main"}: {title: string, value: number | string, unit?: string, colorVariant?: "orange" | "emerald" | "main"}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSprint = useSpring(x, { stiffness: 800, damping: 90 });
    const mouseYSprint = useSpring(y, { stiffness: 800, damping: 90 });
    const rotateX = useTransform(
        mouseXSprint,
        [-0.5, 0.5],
        ["-15deg", "15deg"],
    );
    const rotateY = useTransform(
        mouseYSprint,
        [-0.5, 0.5],
        ["15deg", "-15deg"],
    );
    const handleMouseMove = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPercentage = mouseX / width - 0.5;
        const yPercentage = mouseY / height - 0.5;
        x.set(xPercentage);
        y.set(yPercentage);
    };
    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };
    if (colorVariant === "emerald") {
        return (
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-name="Wrapper"
                style={{ rotateY: rotateX, rotateX: rotateY }}
                className="relative w-full h-64 p-1 mb-8 transition-shadow duration-500 rounded-lg shadow-lg select-none group/card pointer md:w-48 transform-gpu bg-opacity-90 bg-gradient-to-tr from-emerald-500 to-lime-600 hover:from-lime-500 hover:to-emerald-500 hover:shadow-emerald-500 dark:to-emerald-800 "
            >
                <motion.div
                    data-name="Content"
                    className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-tl from-gray-200 via-white via-50% to-white p-2 dark:from-gray-800 dark:via-dark dark:to-slate-900"
                >
                    <h4
                        className={`z-20 mt-4 w-full text-center text-2xl ${caveat.className} font-semibold`}
                    >
                        {title}
                    </h4>
                    <motion.div className="absolute w-32 h-32 ml-12 rounded-full shadow-lg bottom-8 right-4 bg-gradient-to-tr from-emerald-500 to-emerald-800 opacity-20 blur-2xl" />
                    <p className="z-20 mb-auto mr-4 ">
                        <span
                            className={`transform-gpu text-5xl font-semibold text-emerald-700 antialiased transition-all group-hover/card:scale-125 ${caveat.className}`}
                        >
                            {value}
                        </span>{" "}
                        <br />
                    </p>
                    <p
                        className={`mb-8 mr-4 self-end justify-self-end ${sfPro.className} tracking-widest`}
                    >
                        {unit || ""}
                    </p>
                </motion.div>
            </motion.div>
        );
    }
    if (colorVariant === "orange") {
        return (
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                data-name="Wrapper"
                style={{ rotateY: rotateX, rotateX: rotateY }}
                className="relative w-full h-64 p-1 mb-8 transition-shadow duration-500 rounded-lg shadow-lg select-none group/card pointer md:w-48 transform-gpu bg-opacity-90 bg-gradient-to-tr from-red-500 to-orange-600 hover:from-orange-500 hover:to-red-500 hover:shadow-orange-500 dark:to-red-800 "
            >
                <motion.div
                    data-name="Content"
                    className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-tl from-gray-200 via-white via-50% to-white p-2 dark:from-gray-800 dark:via-dark dark:to-slate-900"
                >
                    <h4
                        className={`z-20 mt-4 w-full text-center text-2xl ${caveat.className} font-semibold`}
                    >
                        {title}
                    </h4>
                    <motion.div className="absolute w-32 h-32 ml-12 rounded-full shadow-lg bottom-8 right-4 bg-gradient-to-tr from-orange-500 to-red-800 opacity-20 blur-2xl" />
                    <p className="z-20 mb-auto mr-4 ">
                        <span
                            className={`transform-gpu text-5xl font-semibold text-orange-700 antialiased transition-all group-hover/card:scale-125 ${caveat.className}`}
                        >
                            {value}
                        </span>{" "}
                        <br />
                    </p>
                    <p
                        className={`mb-8 mr-4 self-end justify-self-end ${sfPro.className} tracking-widest`}
                    >
                        {unit || ""}
                    </p>
                </motion.div>
            </motion.div>
        );
    }
    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-name="Wrapper"
            style={{ rotateY: rotateX, rotateX: rotateY }}
            className="relative w-full h-64 p-1 mb-8 transition-shadow duration-500 rounded-lg shadow-lg select-none group/card pointer md:w-48 transform-gpu bg-opacity-90 bg-gradient-to-tr from-violet-500 to-sky-600 hover:from-sky-500 hover:to-violet-500 hover:shadow-sky-500 dark:to-sky-800 "
        >
            <motion.div
                data-name="Content"
                className="flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-tl from-gray-200 via-white via-50% to-white p-2 dark:from-gray-800 dark:via-dark dark:to-slate-900"
            >
                <h4
                    className={`z-20 mt-4 w-full text-center text-2xl ${caveat.className} font-semibold`}
                >
                    {title}
                </h4>
                <motion.div className="absolute w-32 h-32 ml-12 rounded-full shadow-lg bottom-8 right-4 bg-gradient-to-tr from-violet-500 to-sky-800 opacity-20 blur-2xl" />
                <p className="z-20 mb-auto mr-4 ">
                    <span
                        className={`transform-gpu text-5xl font-semibold text-main-700 antialiased transition-all group-hover/card:scale-125 ${caveat.className}`}
                    >
                        {value}
                    </span>{" "}
                    <br />
                </p>
                <p
                    className={`mb-8 mr-4 self-end justify-self-end ${sfPro.className} tracking-widest`}
                >
                    {unit || ""}
                </p>
            </motion.div>
        </motion.div>
    );
}
