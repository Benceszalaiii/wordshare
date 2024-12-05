"use server";
import ScrollDownButton from "@/components/home/scrolldown";
import { BentoGrid } from "@/components/ui/bento-grid";
import { AnimatedGradientText } from "@/components/ui/gradient-text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import IntroductionBento from "@/components/intro-bento"
export default async function Home() {
    return (
        <div className="flex flex-col items-center">
            <Suspense
                fallback={
                    <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-light object-contain p-0 dark:bg-dark" />
                }
            >
                <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-main-light bg-cover bg-center bg-no-repeat p-0 dark:bg-main-dark" />
            </Suspense>
            <div className="w-full max-w-4xl px-5 py-36 xl:px-0">
                <div className="mb-[50vh] flex flex-col items-center gap-24">
                    <h1 className="motion-preset-expand h-full bg-gradient-to-br from-main-400 to-main-300 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm motion-duration-1000 [text-wrap:balance] dark:from-white dark:to-main-400 md:text-7xl md:leading-[5rem]">
                        Practice for your next{" "}
                        <span className="text-main-500">language exam</span>{" "}
                        with ease.
                    </h1>
                    <ScrollDownButton
                        className="motion-preset-rebound-down relative motion-duration-1000"
                        outlineColor="text-dark"
                    />
                </div>
                <IntroductionBento />
                <Link
                    href={"/quickstart"}
                    className="mt-8 flex w-full items-center justify-center"
                >
                    <AnimatedGradientText className="text-lg transition-all duration-500 ease-in-out hover:scale-110">
                    ☄️<hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                        <span
                            className={cn(
                                `animate-gradient inline bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            Get started now
                        </span>
                    </AnimatedGradientText>
                </Link>
            </div>
        </div>
    );
}
