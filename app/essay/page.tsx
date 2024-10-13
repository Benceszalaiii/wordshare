import React, { Suspense } from "react";
import { EssayList } from "@/components/essay/essaylist";
import { Loading } from "@/components/loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  return (
    <div className="p-4 dark:text-white md:px-32">
      <h1 className="mb-12 mt-8 text-2xl font-bold">All essays</h1>
      <Suspense
        fallback={
        <div className="flex w-72 flex-col space-y-3 rounded-xl border p-4 dark:border-white">
          <Skeleton className="h-8 w-36 rounded-xl" />
          <div className="pt-6 flex h-full flex-col justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <Skeleton className="mb-4 h-4 w-24" />
          </div>
        </div>}
      >
        <EssayList />
      </Suspense>
    </div>
  );
}
