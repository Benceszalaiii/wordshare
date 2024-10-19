import Link from "next/link";
import { Icon } from "./images";
import { cn } from "@/lib/utils";

export function ClassSideBar({ classId, className }: { classId: string, className?: string }) {
    return (
        <div className={cn("flex flex-col gap-4 w-64 h-full bg-gray-200 dark:bg-gray-800", className)}>
            <Icon classId={classId} className="w-64 h-64" />
            <div className="flex flex-col gap-4">
                <Link href={`/class/${classId}/edit`}>
                    <button className="p-4 bg-blue-500 text-white rounded-lg">Edit</button>
                </Link>
                <Link href={`/class/${classId}/delete`}>
                    <button className="p-4 bg-red-500 text-white rounded-lg">Delete</button>
                </Link>
            </div>
        </div>
    )
}