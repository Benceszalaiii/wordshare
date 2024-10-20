"use client";

import { caveat } from "@/app/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div className="w-full bg-beige-400 z-50 bg-opacity-50 backdrop-blur-md dark:bg-black flex flex-col items-center justify-center" aria-hidden="true">
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className={"text-2xl font-bold " + caveat.className}>WordShare</h2>
        <p className="text-gray-500 text-center">
          Learn English with daily cards! 📚🔥
        </p>
        </div>
        <div className="flex flex-row gap-6">
        <a href={"/roadmap"} className="hover:underline underline-offset-2">Roadmap</a>
        <a href={"/shortcuts"} className="hover:underline underline-offset-2">Shortcuts</a>
        </div>
      <p className="text-gray-500 p-4 pb-4">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/benceszalaiii"
          target="_blank"
          rel="noopener noreferrer"
        >
          Benceszalaiii
        </a>
      </p>

    </div>
  );
}
