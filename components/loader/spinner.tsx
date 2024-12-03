import { cn } from "@/lib/utils";

export default function LoaderSpinner({
    className,
    text,
    variation = "hue",
}: {
    text?: boolean;
    className?: string;
    variation?: "hue" | "normal";
}) {
    if (variation === "hue") {
        return (
            <div
                className={cn(
                    "flex w-full flex-col items-center justify-center gap-4",
                    className,
                )}
            >
                <div className="aspect-square size-full animate-spin rounded-full bg-gradient-to-bl from-main-400 via-main-600 to-main-800 p-3 drop-shadow-2xl">
                    <div className="background-blur-md size-full rounded-full bg-white dark:bg-dark"></div>
                </div>
                {text && "Loading content..."}
            </div>
        );
    }
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center gap-4",
                className,
            )}
        >
            <div className="flex size-full animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-main-400 text-4xl text-main-400">
                <div className="flex size-full animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-main-400 text-2xl text-main-400"></div>
            </div>
            {text && "Loading content..."}
        </div>
    );
}
