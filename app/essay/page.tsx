import { notFound } from "next/navigation";
import { caveat } from "../fonts";
import React from 'react';
export default function Page(){
    return(
        <div className="absolute flex items-center justify-center z-90 w-screen h-screen shadow-xl bg-black">
        <h1 className={`${caveat.className} tracking-wider text-indigo-800 shadow-indigo-700 text-shadow-xl dark:text-indigo-600 dark:hover:text-indigo-500 text-7xl`}>WordShare</h1>
        </div>
    )
}