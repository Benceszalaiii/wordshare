import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalize, cn, dateToLocalTime } from "@/lib/utils";
import { differenceInDays, formatRelative, isFuture } from "date-fns";

export function DateTooltip({
    date,
    className,
    includeDifference,
    relative,
    withTime,
}: {
    date: Date;
    className?: string;
    includeDifference?: boolean;
    relative?: boolean;
    withTime?: boolean;
}) {
    const localtime = dateToLocalTime(date);
    const difference = differenceInDays(localtime, new Date());
    const now = Date.now();
    const relativeWithFuture = isFuture(localtime)
        ? difference > 0
            ? `in ${difference} days`
            : `Today`
        : `${differenceInDays(new Date(), localtime)} days ago`;
    const basicDateTime = localtime.toLocaleString("en-GB", {
        dateStyle: "long",
        timeStyle: "short",
        hour12: false,
    });
    const basicDate = localtime.toLocaleString("en-GB", { dateStyle: "long" });
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={cn("cursor-default", className)}>
                        {relative
                            ? capitalize(formatRelative(localtime, now))
                            : withTime
                            ? basicDateTime
                            : basicDate}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>
                        {relative
                            ? withTime
                                ? basicDateTime
                                : basicDate
                            : basicDateTime}
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
