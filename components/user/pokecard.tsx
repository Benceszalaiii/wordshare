"use client";
import { caveat, sfPro } from "@/app/fonts";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import * as React from "react";
import CursorWrapper from "./cursor-wrapper";
import useCursorTheme from "@/lib/hooks/use-cursor-theme";
export default function PokeCards({
    wordCount,
    essays,
    streak,
}: {
    wordCount: number;
    streak: number;
    essays: number;
}) {
    return (
        <CursorWrapper title="Statistics">
            <div className="flex flex-col items-center w-full gap-4 justify-evenly md:flex-row md:gap-8">
                <TiltCard
                    title="WordStreak"
                    value={streak}
                    unit="days"
                    colorVariant="orange"

                />
                <TiltCard
                    title="Words written"
                    value={wordCount}
                    unit="words"
                    colorVariant="sky"

                />
                <TiltCard
                    title="Essays"
                    value={essays}
                    unit="essays"
                    colorVariant="emerald"
                />
            </div>
        </CursorWrapper>
    );
}

type Variant = {
    wrapper: string;
    content: string;
    title: string;
    value: string;
    unit: string;
    splash: string;
    color: string;
};

type colorKeys = "orange" | "emerald" | "main" | "sky";

type colorVariantProps = {
    [key in colorKeys]: Variant;
};

const colorVariants: colorVariantProps = {
    emerald: {
        color: "#047857",
        wrapper:
            "hover:from-lime-500 hover:to-emerald-500 hover:shadow-emerald-500 dark:to-emerald-800 from-emerald-500 to-lime-600",
        content:
            "from-gray-200 via-white via-50% to-white dark:from-gray-800 dark:via-dark dark:to-slate-900",
        title: "text-emerald-700",
        value: "text-emerald-700",
        unit: "text-emerald-700",
        splash: "from-emerald-500 to-emerald-800",
    },
    main: {
        color: "#6d28d9",
        wrapper:
            "hover:from-main-500 hover:to-main-500 hover:shadow-main-500 dark:to-main-800 from-main-500 to-main-600",
        content:
            "from-gray-200 via-white via-50% to-white dark:from-gray-800 dark:via-dark dark:to-slate-900",
        title: "text-main-700",
        value: "text-main-700",
        unit: "text-main-700",
        splash: "from-main-500 to-main-800",
    },
    orange: {
        color: "#c2410c",
        wrapper:
            "hover:from-orange-500 hover:to-red-500 hover:shadow-orange-500 dark:to-red-800 from-red-500 to-orange-600",
        content:
            "from-gray-200 via-white via-50% to-white dark:from-gray-800 dark:via-dark dark:to-slate-900",
        title: "text-orange-700",
        value: "text-orange-700",
        unit: "text-orange-700",
        splash: "from-orange-500 to-red-800",
    },
    sky: {
        color: "#0369a1",
        wrapper:
            "hover:from-sky-500 hover:to-violet-500 hover:shadow-sky-500 dark:to-sky-800 from-violet-500 to-sky-600",
        content:
            "from-gray-200 via-white via-50% to-white dark:from-gray-800 dark:via-dark dark:to-slate-900",
        title: "text-sky-700",
        value: "text-sky-700",
        unit: "text-sky-700",
        splash: "from-sky-500 to-sky-800",
    },
};

export function TiltCard({
    title,
    value,
    unit,
    colorVariant = "main",
    sectionCursorColor
}: {
    title: string;
    value: number | string;
    unit?: string;
    sectionCursorColor?: string;
    colorVariant?: colorKeys;
}) {
    const currentVariant = colorVariants[colorVariant];
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
        sectionCursorColor ? setTheme(sectionCursorColor) : setCursorDefault();
    };
    const {setCursorDefault, setTheme} = useCursorTheme();
    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={()=> {setTheme(currentVariant.color)}}
            onMouseLeave={handleMouseLeave}
            data-name="Wrapper"
            style={{ rotateY: rotateX, rotateX: rotateY }}
            className={
                "group/card pointer relative mb-8 h-64 w-full transform-gpu select-none rounded-lg bg-opacity-90 bg-gradient-to-tr p-1 shadow-lg transition-shadow duration-500 md:w-48 " +
                currentVariant.wrapper
            }
        >
            <motion.div
                data-name="Content"
                className={
                    "flex h-full w-full flex-col items-center justify-center gap-8 rounded-lg bg-gradient-to-tl via-50% p-2 " +
                    currentVariant.content
                }
            >
                <h4
                    className={`z-20 mt-4 w-full text-center text-2xl ${caveat.className} font-semibold`}
                >
                    {title}
                </h4>
                <motion.div
                    className={
                        "absolute bottom-8 right-4 ml-12 h-32 w-32 rounded-full bg-gradient-to-tr opacity-20 shadow-lg blur-2xl"
                    }
                />
                <p className="z-20 mb-auto mr-4">
                    <span
                        className={`transform-gpu text-5xl font-semibold ${currentVariant.value} antialiased transition-all group-hover/card:scale-125 ${caveat.className}`}
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
