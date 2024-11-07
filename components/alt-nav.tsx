"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export function AltNav({
    items,
    className,
}: {
    items?: { title: string; path: string }[];
    className?: string;
}) {
    const path = usePathname();

    return (
        <>
            {/* <div className="flex w-full max-w-full">{path}</div> */}
            <div className="group flex w-full transform-gpu flex-col items-center justify-center gap-4 antialiased transition-all sm:flex-row">
                {items?.map((item, index) => (
                    <Link
                        prefetch={false}
                        href={item.path}
                        key={index}
                        className={` scale-75 text-gray-800 underline-offset-2 transition-all  hover:scale-100 group-hover:block dark:text-gray-300 ${className} ${
                            item.path === path
                                ? "block underline dark:text-white"
                                : ``
                        }`}
                    >
                        {item.title}
                    </Link>
                ))}
            </div>
        </>
    );
}
