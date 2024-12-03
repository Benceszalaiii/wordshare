"use client";

import { getEvent } from "@/app/actions";
import { caveat } from "@/app/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
export default function Footer() {
    const [eventText, setEventText] = useState<string[] | null>(null);

    useEffect(() => {
        getEvent().then(async (res) => {
            switch (res) {
                case "HALLOWEEN":
                    setEventText(["Happy", "Halloween!"]);
                    break;
                case "XMAS":
                    setEventText(["Merry", "Christmas!"]);
                    break;
                default:
                    setEventText(null);
                    break;
            }
        });
    }, []);
    return (
        <div
            className="z-50 flex w-full flex-col items-center justify-center border-t border-border bg-beige-400 bg-opacity-50 backdrop-blur-md dark:bg-neutral-950"
            aria-hidden="true"
        >
            <div className="flex flex-col items-center justify-center p-4">
                {eventText && (
                    <p className="py-4 text-left font-display text-lg font-light">
                        {eventText && eventText[0]}{" "}
                        <b className="font-extrabold text-main-700">
                            {eventText && (eventText[1] || "")}
                        </b>
                    </p>
                )}
                <h2 className={"text-2xl font-bold " + caveat.className}>
                    WordShare
                </h2>
                <p className="text-center text-gray-500">
                    Learn English with daily cards! 📚🔥
                </p>
            </div>
            <div className="flex flex-row gap-6">
                <Link href="mailto:szalaibence0817@gmail.com">
                    <Button variant={"linkHover2"}>Contact us</Button>
                </Link>
                <Link href={"/shortcuts"}>
                <Button
                    variant={"linkHover2"}
                    >
                    Shortcuts
                </Button>
                    </Link>
            </div>
            <p className="p-4 pb-4 text-gray-500">
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
