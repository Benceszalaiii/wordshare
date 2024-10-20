"use client"
import { Invite } from "@prisma/client";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
export async function ActionButtons({ invite }: { invite: Invite }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Invite choice</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
            <DropdownMenuItem onClick={async()=> {
                const res = await fetch(`/api/class/invite/${invite.classId}/${invite.userId}`, {method: "PUT"})
                if (res.ok) toast.success(await res.text())
                else toast.error(await res.text())
            }} className="dark:text-emerald-500 text-emerald-700 hover:text-emerald-600 hover:dark:text-emerald-400">
                Accept invitation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async()=> {
                const res = await fetch(`/api/class/invite/${invite.classId}/${invite.userId}`, {method: "DELETE", headers: {inviteId: invite.id}})
                if (res.ok) toast.success(await res.text())
                else toast.error(await res.text())
            }} className=" text-rose-700 hover:text-rose-600 dark:text-rose-500 hover:dark:text-rose-400">Decline invitation</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
