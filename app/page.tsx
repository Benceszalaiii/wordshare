import Link from "next/link";
import { caveat } from "./fonts";
import "./index.css";
import ScrollDownButton from "@/components/home/scrolldown";
import { Button } from "@/components/ui/button";
export default async function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className=" w-full max-w-4xl px-5 py-32 xl:px-0">
        <div className="mb-[50vh] flex flex-col items-center gap-24">
          <h1 className="h-full bg-gradient-to-br from-neutral-700 to-sky-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-purple-400 md:text-7xl md:leading-[5rem]">
            Practice for your next{" "}
            <span className="bg-gradient-to-tr from-sky-400 via-50% to-sky-800 bg-clip-text dark:from-sky-500 dark:via-purple-600 ">
              english exam
            </span>{" "}
            with ease.
          </h1>
          <ScrollDownButton className="relative" outlineColor="text-dark" />
        </div>
        <p className="relative h-full w-full rounded-2xl border border-sky-500 p-4 font-default antialiased backdrop-blur-lg transition-all duration-500 ease-in-out hover:scale-105 dark:border-sky-500 dark:text-white">
          Welcome to WordShare! Join a class, complete engaging writing tasks,
          and enhance your vocabulary with personalized word collections.
          Whether you&apos;re looking to improve your essay writing skills or expand
          your language knowledge, we&apos;re here to help you grow!
        </p>
        <div className="mt-8 flex w-full justify-center items-center">
          <a className="index-button" href={"/quickstart"}>
            Get started now!
          </a>
        </div>
      </div>
    </div>
  );
}
