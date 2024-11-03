import { cn } from "@/lib/utils";

export default function LoaderDots({ className, title, top }: { className?: string, title?: string, top?: boolean }) {
    return (
        <div className={top ? "fixed transition-all top-0 left-0 w-screen h-screen p-0 m-0 z-10 backdrop-blur-sm flex flex-col gap-4 items-center justify-center" : cn("flex flex-col w-full gap-4 items-center justify-center", className)}>
            <div className="flex flex-row gap-2">
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-500 [animation-delay:.3s]"></div>
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-600 [animation-delay:.7s]"></div>
                <div className="h-6 w-6 animate-bounce rounded-full bg-main-700 [animation-delay:.3s]"></div>
            </div>
            <p className="tracking-wider text-lg font-display">{title || ""}</p>
        </div>
    );
}
