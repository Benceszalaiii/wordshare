import { EssayList } from "@/components/essay/essaylist";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
export default function Page() {
    return (
        <div className="p-4 dark:text-white md:px-32">
            <h1 className="mb-12 text-2xl font-bold">All essays</h1>
            <Suspense
                fallback={
                    <div className="flex w-72 flex-col space-y-3 rounded-xl border p-4 dark:border-white">
                        <Skeleton className="h-8 w-36 rounded-xl" />
                        <div className="flex h-full flex-col justify-between pt-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                            <Skeleton className="mb-4 h-4 w-24" />
                        </div>
                    </div>
                }
            >
                <EssayList />
            </Suspense>
        </div>
    );
}
