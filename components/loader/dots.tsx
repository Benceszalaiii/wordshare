import { cn } from "@/lib/utils";

export default function LoaderDots({
    className,
    title,
    top,
}: {
    className?: string;
    title?: string;
    top?: boolean;
}) {
    return (
        <div
            className={
                top
                    ? "fixed left-0 top-0 z-10 m-0 flex h-screen w-screen flex-col items-center justify-center gap-4 p-0 backdrop-blur-sm transition-all"
                    : cn(
                          "flex w-full flex-col items-center justify-center gap-4",
                          className,
                      )
            }
        >
            <div className="flex flex-row gap-2">
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-500 [animation-delay:.3s]"></div>
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-600 [animation-delay:.7s]"></div>
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-700 [animation-delay:.3s]"></div>
            </div>
            <p className="font-display text-lg tracking-wider">{title || ""}</p>
        </div>
    );
}
