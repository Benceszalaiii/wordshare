import { Class } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export function ClassItem({ item }: { item: Class }) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                tooltip={item.name}
                className="relative flex h-fit flex-row hover:bg-gray-300 hover:dark:bg-neutral-800"
                asChild
            >
                <Link
                    href={`/class/${item.id}`}
                    className="flex flex-row gap-1"
                    passHref
                >
                    <Avatar className="object-cover group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                        <AvatarImage
                            className="h-full w-full"
                            src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${item.id}/icon`}
                        />
                        <AvatarFallback>{item.name.slice(0, 3)}</AvatarFallback>
                    </Avatar>
                    <span className="font-bold group-data-[collapsible=icon]:hidden">
                        {item.name}
                    </span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
