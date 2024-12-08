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
        <div className="flex flex-col items-center">
            <Suspense
                fallback={
                    <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-light object-contain p-0 dark:bg-dark" />
                }
            >
                <div className="fixed left-0 top-0 -z-10 m-0 h-full w-full bg-main-light bg-cover bg-center bg-no-repeat p-0 dark:bg-main-dark" />
            </Suspense>
            <div className=" w-full max-w-4xl px-5 py-36 xl:px-0">
                <div className="mb-[50vh] flex flex-col items-center gap-24">
                    <h1 className="h-full bg-gradient-to-br motion-preset-expand motion-duration-1000 from-main-400 to-main-300 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-main-400 md:text-7xl md:leading-[5rem]">
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
