"use server";
import MainButton from "@/components/home/home-button";
import IntroductionBento from "@/components/intro-bento";
import { AnimatedGradientText } from "@/components/ui/gradient-text";
import WordRotate from "@/components/ui/word-rotate";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
export default async function Home() {
    return (
        <div className="flex flex-col w-full items-center">
            <Suspense
                fallback={
                    <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-light object-contain p-0 dark:bg-dark" />
                }
            >
                <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-main-light bg-cover bg-center bg-no-repeat p-0 dark:bg-main-dark" />
            </Suspense>
            <div className="w-full max-w-4xl h-full px-5 pt-32 xl:px-0">
                <div className="flex flex-col items-center sm:gap-24 sm:py-12">
                    <div className="motion-blur-in-md h-64 sm:h-full bg-gradient-to-br from-main-400 to-main-600/85 bg-clip-text text-center font-display text-3xl sm:text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm motion-duration-1000 [text-wrap:balance] dark:from-white dark:to-main-400 md:text-7xl sm:leading-[5rem]">
                        Practice for your next{" "}
                        <WordRotate
                            className="inline-block text-main-500"
                            duration={3500}
                            words={[
                                "language exam",
                                "trip abroad",
                                "entrance exam",
                            ]}
                        />{" "}
                        with ease.
                    </div>
                    <MainButton></MainButton>
                </div>
            </div>
                <section className="px-4 flex flex-col py-12 items-center justify-center w-full">
                    <IntroductionBento />
                    <Link
                        href={"/quickstart"}
                        className="mt-8"
                    >
                        <AnimatedGradientText className="transition-all duration-500 ease-in-out hover:scale-110">
                            ✨
                            <span
                                className={cn(
                                    `ml-1 inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-lg text-transparent`,
                                )}
                            >
                                Get started now
                            </span>
                        </AnimatedGradientText>
                    </Link>
                </section>
        </div>
    );
}
