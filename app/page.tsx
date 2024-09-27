
import Card from "@/components/home/card";
import { SignInButton } from "@/components/shared/buttons";
import { getServerSession } from "next-auth";
import { auth } from "@/auth";
import { Balls } from '@/components/home/backgroundcircles';
import ScrollDownButton from "@/components/home/scrolldown";
export default async function Home() {

  return (
    <>
      <div className=" w-full max-w-4xl px-5 xl:px-0 py-32">
        <h1
          className="animate-fade-up h-full mb-80 bg-gradient-to-br from-black to-indigo-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-purple-400 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Practice for your next{" "}
          <span className="bg-gradient-to-tr dark:from-orangea-500 dark:via-purple-600 from-orange-500 via-purple-500 via-50% to-indigo-500 bg-clip-text ">
            english exam
          </span>{" "}
          with ease.
        </h1>
      <ScrollDownButton className="w-full h-28 flex items-end justify-center my-48" outlineColor="text-dark" />
        <div className="text-dark dark:text-light w-full h-28 z-10">
          <p className="w-full h-full relative">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure culpa porro non repellendus rem, cupiditate cumque explicabo cum et. Non exercitationem minus pariatur deserunt libero eius obcaecati, nostrum iusto nesciunt!</p>
        </div>
      </div>
    </>
  );
}
