import Link from "next/link";
import { caveat } from "./fonts";
import "./index.css"
import ScrollDownButton from "@/components/home/scrolldown";
import { Button } from "@/components/button";
export default async function Home() {

  return (
    <div className="flex flex-col items-center">
      <div className=" w-full max-w-4xl px-5 xl:px-0 py-32">
        <div className="flex flex-col items-center mb-[50vh] gap-24">
          <h1
            className="h-full bg-gradient-to-br from-black to-indigo-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-purple-400 md:text-7xl md:leading-[5rem]"
          >
            Practice for your next{" "}
            <span className="bg-gradient-to-tr dark:from-sky-500 dark:via-purple-600 from-orange-500 via-purple-500 via-50% to-indigo-500 bg-clip-text ">
              english exam
            </span>{" "}
            with ease.
          </h1>
          <ScrollDownButton className="relative" outlineColor="text-dark" />
        </div>
        <p className="w-full h-full relative dark:text-white font-default backdrop-blur-2xl rounded-2xl antialiased border-orange-500 dark:border-sky-500 border p-4 hover:scale-105 transition-all duration-500 ease-in-out">Welcome to WordShare! Join a class, complete engaging writing tasks, and enhance your vocabulary with personalized word collections. Whether you&apos;re looking to improve your essay skills or expand your language knowledge, we&apos;re here to help you grow!
        </p>
        <Button className="mt-8 flex items-center w-full"><a className="index-button" href={"/quickstart"}>Get started now!</a></Button>
      </div>
    </div>
  );
}
