"use server";
import { cn } from "@/lib/utils";

import React from "react";
import { SaveButton, UndoButtons } from "./buttons";
export async function RoadmapBlock({
    className,
    title,
    date,
    children,
}: {
    className?: string;
    title: string;
    date?: Date | null;
    children?: React.ReactNode;
}) {
    if (date) {
        return (
            <li className={cn("mb-10 ms-4 w-full", className)}>
                <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-600 dark:border-green-900 dark:bg-green-700"></div>
                <p className="mb-1 text-sm font-normal leading-none text-main-600 dark:text-main-500">
                    {date.toDateString()}
                </p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {children}
                </div>
            </li>
        );
    }
    return (
        <li className={cn("mb-10 ms-4 w-full", className)}>
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-main-600 dark:border-main-900 dark:bg-main-700"></div>
            <p className="mb-1 text-sm font-normal leading-none text-main-600 dark:text-main-500"></p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
            </h3>
            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {children}
            </div>
        </li>
    );
}

export async function AdminRoadmapBlock({
    className,
    title,
    date,
    id,
    children,
}: {
    className?: string;
    title: string;
    date?: Date | null;
    id: number;
    children?: React.ReactNode;
}) {
    if (date) {
        return (
            <li className={cn("group mb-10 ms-4 w-full", className)}>
                <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-600 dark:border-green-900 dark:bg-green-700"></div>
                <p className="mb-1 text-sm font-normal leading-none text-main-600 dark:text-main-500">
                    {date.toDateString()}
                </p>
                <div className="flex flex-row items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <UndoButtons roadmapId={id} />
                </div>
                <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {children}
                </div>
            </li>
        );
    }
    return (
        <li className={cn("group mb-10 ms-4 w-full", className)}>
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-main-600 dark:border-main-900 dark:bg-main-700"></div>
            <p className="mb-1 text-sm font-normal leading-none text-main-600 dark:text-main-500">
                {date}
            </p>
            <div className="flex flex-row items-center gap-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                </h3>
                <SaveButton roadmapId={id} />
            </div>
            <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                {children}
            </div>
        </li>
    );
}
