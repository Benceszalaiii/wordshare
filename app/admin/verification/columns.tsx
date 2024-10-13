"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { revalidatePath } from "next/cache";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "Avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <img
          src={user.image ? user.image : "https://via.placeholder.com/150"}
          alt={"-"}
          className="h-8 w-8 rounded-full"
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      if (!user.role) return "None";
      return <div className="capitalize">{user.role}</div>;
    },
  },
  {
    id: "actions",
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
              onClick={async () => {
                toast.promise(
                  async () => {
                    const response = await fetch(`/api/request/`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: user.id,
                        secret: "baddadan",
                        decision: "accept",
                      }),
                    });
                  },
                  { richColors: true, loading: "Accepting request", success: "Request accepted", error: "Failed to accept request" },
                );
              }}
            >
              Accept request
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={async () => {
                toast.promise(
                  async () => {
                    const response = await fetch(`/api/request/`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        userId: user.id,
                        secret: "baddadan",
                        decision: "reject",
                      }),
                    });
                  },
                  { richColors: true, loading: "Accepting request", success: "Request accepted", error: "Failed to accept request" },
                );
              }}>Decline request</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
