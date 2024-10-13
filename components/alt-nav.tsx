"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"
export function AltNav({items, className}: {items?: {title: string, path: string}[], className?: string}){
    const path = usePathname();

    return (
        <>
        {/* <div className="flex w-full max-w-full">{path}</div> */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full antialiased group transform-gpu transition-all">
        {items?.map((item, index) => (
            <Link prefetch={false} href={item.path} key={index} className={` text-gray-800 scale-75 hover:scale-100 transition-all  dark:text-gray-300 underline-offset-2 group-hover:block ${className} ${item.path === path ? "underline block dark:text-white": ``}`}>
                {item.title}
            </Link>
        ))}
        </div>
        </>
    )
}