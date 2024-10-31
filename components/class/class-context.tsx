"use client";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
    ContextMenuSeparator,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuSub,
} from "@/components/ui/context-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ClassContextWrapper({
    children,
    classId,
    canEdit,
    currentClassName,
}: {
    children: React.ReactNode;
    classId: string;
    canEdit?: boolean;
    currentClassName: string;
}) {
    const router = useRouter();
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem
                    onClick={async () => {
                        const res = await fetch(`/api/class/pin/${classId}`, {
                            method: "DELETE",
                        });
                        if (res.ok) {
                            router.refresh();
                        }
                    }}
                >
                    Unpin from Sidebar
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>
                        Students
                    </ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem asChild><Link href={`/class/${classId}/invite`}>Invite Students</Link></ContextMenuItem>
                        <ContextMenuItem asChild><Link href={`/class/${classId}/students`}>Manage Students</Link></ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSub>
                    <ContextMenuSubTrigger disabled className="text-gray-500 dark:text-gray-600" inset>Tasks</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem asChild><Link href={`/class/${classId}/tasks?latest`}>Latest</Link></ContextMenuItem>
                        <ContextMenuItem asChild><Link href={`/class/${classId}/tasks?active`}>Active</Link></ContextMenuItem>
                        <ContextMenuItem asChild><Link href={`/class/${classId}`}>All</Link></ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem asChild><Link href={`/class/${classId}/edit`}>Edit</Link></ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
