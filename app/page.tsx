
import Card from "@/components/home/card";
import { SignInButton } from "@/components/shared/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Balls } from '@/components/home/backgroundcircles';
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="z-10 w-full max-w-4xl px-5 xl:px-0 ">
    <div className="absolute -z-50 w-fill h-fill top-0 left-0">
    <Balls />
    </div>
        <h1
          className="animate-fade-up h-screen bg-gradient-to-br from-black to-indigo-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] dark:from-white dark:to-purple-400 md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          Practice for your next{" "}
          <span className="bg-gradient-to-tr from-purple-400 via-purple-600 via-50% to-indigo-500 bg-clip-text ">
            english exam
          </span>{" "}
          with ease.
        </h1>
        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7"/>
</svg>

        <div className="text-dark dark:text-light">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure culpa porro non repellendus rem, cupiditate cumque explicabo cum et. Non exercitationem minus pariatur deserunt libero eius obcaecati, nostrum iusto nesciunt!</p>
        </div>  
      </div>
    </>
  );
}
