"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserWithClassId } from "./page";
import { CoinsIcon, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { WordPoints } from "@/components/shared/points";
export const columns: ColumnDef<UserWithClassId>[] = [
    {
        accessorKey: "Avatar",
        header: "Avatar",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <Image
                    src={
                        user.image
                            ? user.image
                            : "https://via.placeholder.com/150"
                    }
                    alt={"-"}
                    className="h-8 w-8 rounded-full"
                    width={96}
                    height={96}
                    loading="lazy"
                />
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableGlobalFilter: true,
    },
    {
        accessorKey: "points",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Points
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        enableGlobalFilter: true,
        cell: ({ row }) => {
            const user = row.original;
            return <WordPoints points={user.points} />;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(user.name || "")
                            }
                        >
                            Copy Name
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>View user</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                toast.promise(
                                    async () => {
                                        return fetch(
                                            `/api/class/leave/${row.original.classId}`,
                                            { method: "DELETE", headers: { userId: row.original.id } },
                                        );
                                    },
                                    {
                                        loading: "Kicking...",
                                        success: "Kicked!",
                                        error: "Failed to kick!",
                                    },
                                );
                            }}
                            className="text-red-500"
                        >
                            Kick
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
