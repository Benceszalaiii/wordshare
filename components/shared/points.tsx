import { SparkleIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function WordPoints({ points }: { points: number }) {
    return (
        <div className="flex flex-row items-center gap-1">
            {points}
            <SparkleIcon className="h-4 w-4" />
        </div>
    );
}

export function AllPoints({ points, isClassPoints }: { points: number, isClassPoints: boolean }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-row items-center cursor-default gap-1">
                        {points}
                        <SparkleIcon className="h-4 w-4" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isClassPoints ? "Your WordPoints in current class" : "Your WordPoints across all classes"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
