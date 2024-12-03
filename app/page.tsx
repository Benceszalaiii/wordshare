"use server";
import ScrollDownButton from "@/components/home/scrolldown";
import { Suspense } from "react";
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
            <div className=" w-full max-w-4xl px-5 py-36 xl:px-0">
                <div className="mb-[50vh] flex flex-col items-center gap-24">
                    <h1 className="h-full bg-gradient-to-br motion-preset-expand motion-duration-1000 from-main-400 to-main-300 bg-clip-text text-center font-display text-5xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-main-400 md:text-7xl md:leading-[5rem]">
                        Practice for your next{" "}
                        <span className="text-main-500 ">language exam</span>{" "}
                        with ease.
                    </h1>
                    <ScrollDownButton
                        className="relative motion-preset-rebound-down motion-duration-1000"
                        outlineColor="text-dark"
                    />
                </div>
                <p className="relative h-full w-full rounded-2xl border border-main-500 p-4 font-default antialiased backdrop-blur-lg transition-all duration-500 ease-in-out hover:scale-105 dark:border-main-500 dark:text-white">
                    Welcome to WordShare! Join a class, complete engaging
                    writing tasks, and enhance your vocabulary with personalized
                    word collections. Whether you&apos;re looking to improve
                    your essay writing skills or expand your language knowledge,
                    we&apos;re here to help you grow!
                </p>
                <div className="mt-8 flex w-full items-center justify-center">
                    <a
                        className="rounded-3xl border-2 border-main-500 bg-main-600/25 bg-gradient-to-bl from-white/25 to-main-500/50 p-3 font-bold text-black antialiased backdrop-blur-3xl transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-tr hover:from-main-400 hover:to-main-700/50 hover:underline dark:text-white"
                        href={"/quickstart"}
                    >
                        Get started now!
                    </a>
                </div>
            </div>
        </div>
    );
}
