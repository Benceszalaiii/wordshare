
import Card from "@/components/home/card";
import { SignInButton } from "@/components/shared/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Balls } from '@/components/home/backgroundcircles';
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0">
    <div className="absolute -z-50 w-fill h-fill top-0 left-0">
    <Balls />
    </div>
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-indigo-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-purple-400 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Practice for your next{" "}
          <span className="bg-gradient-to-tr from-purple-400 via-purple-600 via-50% to-indigo-500 bg-clip-text ">
            english exam
          </span>{" "}
          with ease.
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-gray-400 opacity-0 [text-wrap:balance] md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          Get started now
        </p>
        <div
          className="mx-auto mt-6 flex animate-fade-up items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <SignInButton session={session} />

        </div>
      </div>
    </>
  );
}
