import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { Class } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function ClassItem({ item }: { item: Class }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-fit flex flex-row hover:bg-gray-300 hover:dark:bg-neutral-800" asChild>
        <Link href={`/class/${item.id}`} className="flex flex-row gap-1">
        <Avatar>
          <AvatarImage
            className="aspect-square object-cover object-center"
            src={`/class/icons/${item.id}`}
          />
          <AvatarFallback>{item.name.slice(0, 3)}</AvatarFallback>
        </Avatar>
          <span className="font-bold">{item.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
