"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { caveat } from "@/app/fonts";
import { useEffect, useState } from "react";
export default function Footer() {
  const [eventText, setEventText] = useState<string[] | null>(null);
  useEffect(()=> {
    fetch(`/api/event`, {cache: "force-cache", keepalive: true}).then(async (res)=> {switch(await res.text()){
      case "HALLOWEEN":
        setEventText(["Happy", "Halloween!"]);
        break;
      case "XMAS":
        setEventText(["Merry", "Christmas!"]);
        break;
      default:
        setEventText(null);
        break;
    }})
  }, [])
  return (
    <div className="w-full bg-beige-400 z-50 bg-opacity-50 backdrop-blur-md dark:bg-neutral-950 border-t border-border flex flex-col items-center justify-center" aria-hidden="true">
      <div className="flex flex-col items-center justify-center p-4">
        {eventText && <p className="text-left font-display text-lg font-light py-4">{eventText && eventText[0]} <b className="font-extrabold text-main-600">{eventText && (eventText[1] || "")}</b></p>}
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
