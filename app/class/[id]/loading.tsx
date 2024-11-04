import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
            <section className="flex flex-col items-center justify-center gap-4">
                <section className="px-4">
                    <div className="mr-auto flex w-full flex-col justify-start gap-2 px-4">
                        <div className="mr-auto flex flex-col-reverse justify-between sm:flex-row">
                            <Skeleton className="h-10 w-72 self-start text-3xl font-bold sm:text-start" />
                        </div>
                        <Skeleton className="mb-2 mr-24 h-4 w-full text-center text-lg font-semibold" />
                    </div>
                    <Separator />
                    <Skeleton className="my-4 aspect-[41/16] h-[320px] rounded-xl" />
                    <Separator />
                </section>
            </section>
    );
}
