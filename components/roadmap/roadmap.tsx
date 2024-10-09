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
    if (date){
  return (
    <li className={cn("mb-10 ms-4 w-full", className)}>
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-600 dark:border-green-900 dark:bg-green-700"></div>
      <p className="mb-1 text-sm font-normal leading-none text-violet-600 dark:text-violet-500">
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
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-violet-600 dark:border-violet-900 dark:bg-violet-700"></div>
      <p className="mb-1 text-sm font-normal leading-none text-violet-600 dark:text-violet-500">
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
    if (date){
        return (
            <li className={cn("mb-10 ms-4 group w-full", className)}>
              <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-green-600 dark:border-green-900 dark:bg-green-700"></div>
              <p className="mb-1 text-sm font-normal leading-none text-violet-600 dark:text-violet-500">
                {date.toDateString()}
              </p>
              <div className="flex flex-row gap-4 items-center">
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
    <li className={cn("mb-10 ms-4 group w-full", className)}>
      <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-violet-600 dark:border-violet-900 dark:bg-violet-700"></div>
      <p className="mb-1 text-sm font-normal leading-none text-violet-600 dark:text-violet-500">
        {date}
      </p>
      <div className="flex flex-row gap-4 items-center">
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