import { Header } from "@/components/blank";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense
        fallback={
          <>
            <div className=" flex w-full flex-col gap-5 px-4 pt-8 dark:text-white md:px-32">
              <div className="space-between flex w-full flex-row gap-12">
                <div className="flex flex-row items-start justify-start">
                  <Header className="rounded-xl p-3 mb-24">
                    <h1 className="mb-2 w-96 text-3xl font-bold">
                      <Skeleton className="h-8 w-full" />
                    </h1>
                    <div className="ml-2 space-y-2 text-neutral-600">
                      <Skeleton className="h-4 w-72"></Skeleton>
                    </div>
                  </Header>
                </div>
              </div>
              <p className="flex flex-col space-y-2 whitespace-pre-wrap px-4 text-justify font-serif leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg ">
                <div className="w-full flex flex-row gap-0">
                    <div className="p-0 m-0 w-4"></div>
                  <Skeleton className="h-4 w-full"/>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </p>
            </div>
          </>
         }
       >
         {children}
      </Suspense>
    </>
  );
}
