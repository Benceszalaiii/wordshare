"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { UserWithClassId } from "./page";

export const columns: ColumnDef<UserWithClassId>[] = [
  {
accessorKey: "grade",
header: "Grade"
  },
  {
    accessorKey: "Avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Image
          src={user.image ? user.image : "https://via.placeholder.com/150"}
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
              onClick={() => navigator.clipboard.writeText(user.name || "")}
            >
              Copy Name
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>View user</DropdownMenuItem>
            <DropdownMenuItem disabled>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "invite",
    header: "Invite",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Button
          variant="default"
          onClick={async() => {
            const res = await fetch(`/api/class/invite/${user.classId}/${user.id}`, { method: "POST"});
            if (res.status === 208){
                toast.info("User is already invited")
            }
            else if (res.status === 409) toast.info("User is already in the class")
            else if (res.ok) toast.success(await res.text())
            else toast.error(await res.text())
          }}
        >
          Invite
        </Button>
      );
    },
  },
];
