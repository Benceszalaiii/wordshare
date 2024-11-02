"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();
    const className =
        "border p-4 rounded-2xl text-sm transition-all duration-300";
    return (
        <div className="mt-24 flex flex-col items-center justify-center gap-5">
            <h1
                className={`font-serif text-[7rem] font-extrabold text-main-800 dark:text-main-600 `}
            >
                404
            </h1>
            <p className="text-2xl font-semibold text-main-500 dark:text-main-200">
                Page not found
            </p>
            <p>The page you requested does not exist.</p>
            <div className="flex flex-row gap-5">
                <Link href="/" passHref>
                    <Button variant={"destructive"}>Home page</Button>
                </Link>
                <Button
                    variant={"ghost"}
                    className={cn("", className)}
                    onClick={() => {
                        router.back();
                    }}
                >
                    Previous site
                </Button>
            </div>
        </div>
    );
}
