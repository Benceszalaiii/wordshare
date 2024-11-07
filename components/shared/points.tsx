import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { SparkleIcon } from "lucide-react";

export function WordPoints({ points, className }: { points: number, className?: string }) {
    return (
        <div className={cn("flex flex-row items-center gap-1", className)}>
            {points}
            <SparkleIcon className="h-4 w-4" />
        </div>
    );
}

export function AllPoints({
    points,
    isClassPoints,
}: {
    points: number;
    isClassPoints: boolean;
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex cursor-default flex-row items-center gap-1">
                        {points}
                        <SparkleIcon className="h-4 w-4" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {isClassPoints
                            ? "Your WordPoints in current class"
                            : "Your WordPoints across all classes"}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
