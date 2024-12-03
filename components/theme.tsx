"use client";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LoadingDots } from "./shared/icons";

const ThemeSwitch = ({ className }: { className?: string }) => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                name="theme-loading"
                aria-label="Theme settings loading..."
                className="animate-pulse cursor-progress"
                disabled
            >
                <LoadingDots
                    className={`h-6 w-6 text-gray-800 dark:text-white ${className}`}
                    color="#f0f0f0"
                />
            </button>
        );
    }
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
        return (
            <>
                <button
                    name="theme-switch"
                    aria-label="Switch theme"
                    onClick={() => {
                        setTheme(resolvedTheme === "light" ? "dark" : "light");
                    }}
                >
                    {resolvedTheme === "light" ? (
                        <SunIcon
                            className={`h-6 w-6 text-gray-800 dark:text-white ${className}`}
                        />
                    ) : (
                        <MoonIcon
                            className={`h-6 w-6 text-gray-800 dark:text-white ${className}`}
                        />
                    )}
                </button>
            </>
        );
    } else {
        setTheme("light");
        return "...";
    }
};
export default ThemeSwitch;
