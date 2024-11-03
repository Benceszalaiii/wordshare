import { cn } from "@/lib/utils";

export default function LoaderSpinner({
    className,
    variation = "hue",
}: {
    className?: string;
    variation?: "hue" | "normal";
}) {
    if (variation === "hue") {
        return (
            <div className={cn("flex w-full flex-col items-center justify-center gap-4", className)}>
            <div className="aspect-square h-32 w-32 animate-spin rounded-full bg-gradient-to-bl from-main-400 via-main-600 to-main-800 p-3 drop-shadow-2xl md:h-48 md:w-48">
                <div className="background-blur-md h-full w-full rounded-full bg-white dark:bg-dark"></div>
            </div>
            Loading content...
            </div>
        );
    }
    return (
        <div
            className={cn(
                "flex w-full flex-col items-center justify-center gap-4",
                className,
            )}
        >
            <div className="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-main-400 text-4xl text-main-400">
                <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-main-400 text-2xl text-main-400"></div>
            </div>
            Loading content...
        </div>
    );
}
