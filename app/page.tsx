"use server";
import MainButton from "@/components/home/home-button";
import IntroductionBento from "@/components/intro-bento";
import { AnimatedGradientText } from "@/components/ui/gradient-text";
import { BackgroundLines } from "@/components/ui/lines";
import WordRotate from "@/components/ui/word-rotate";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default async function LandingPage() {
    return (
        <div className="flex w-full flex-col items-center">
            <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-[radial-gradient(circle_at_bottom_center,_var(--tw-gradient-stops))] from-dark/20 via-main-300 to-background p-0 dark:bg-[radial-gradient(circle_at_top_center,_var(--tw-gradient-stops))] dark:from-background dark:via-main-500/15" />
            <div className="h-full w-full max-w-4xl px-5 pt-32">
                <div className="flex flex-col items-center sm:gap-24 sm:py-12">
                    <div className="h-64 bg-gradient-to-br from-main-600 to-main-600 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm motion-duration-1000 motion-blur-in-md [text-wrap:balance] dark:from-white dark:to-main-500 sm:h-full sm:text-5xl sm:leading-[5rem] md:text-7xl">
                        Practice for your next{" "}
                        <WordRotate
                            className="inline-block text-main-700"
                            duration={5000}
                            words={[
                                "language exam",
                                "trip abroad",
                                "entrance exam",
                            ]}
                        />{" "}
                        with ease.
                    </div>
                    <MainButton />
                </div>
            </div>
            <section className="flex w-full flex-col items-center justify-center px-4 py-12">
                <IntroductionBento />
                <Link href={"/quickstart"} className="mt-8">
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
