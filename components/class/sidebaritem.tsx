import { Class } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function ClassItem({ item }: { item: Class }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton className="h-fit flex flex-row hover:bg-gray-300 hover:dark:bg-neutral-800" asChild>
        <Link href={`/class/${item.id}`} className="flex flex-row gap-1" passHref>
        <Avatar>
          <AvatarImage
            className="aspect-square object-cover object-center"
            src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${item.id}/icon`}
          />
          <AvatarFallback>{item.name.slice(0, 3)}</AvatarFallback>
        </Avatar>
          <span className="font-bold">{item.name}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
