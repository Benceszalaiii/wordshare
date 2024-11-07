import { cn } from "@/lib/utils";
import Image from "next/image";

export function Icon({
    classId,
    className,
}: {
    classId: string;
    className?: string;
}) {
    return (
        <div className={cn("relative h-48 w-48 rounded-full", className)}>
            <Image
                src={`/class/icons/${classId}`}
                alt=""
                className="h-full w-full rounded-full object-fill"
                fill
                draggable={false}
            />
        </div>
    );
}
