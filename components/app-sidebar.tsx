import {
    Calendar,
    Home,
    Inbox,
    ListTodo,
    LucideProps,
    Notebook,
    Search,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Class } from "@prisma/client";
import Link from "next/link";
import { ClassItem } from "./class/sidebaritem";

// Menu items.

interface SideBarItem {
    title: string;
    url: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}

export function AppSidebar({
    classes
}: {
    classes?: Class[] | null;
}) {
    const navigation: SideBarItem[] = [
        {
            title: "Home",
            url: "/",
            icon: Home,
        },
        {
            title: "Essay",
            url: "/essay",
            icon: Notebook,
        },
        {
            title: "WordPlay",
            url: "/wordplay",
            icon: Notebook,
        },
        {
            title: "Invites",
            url: "/class/invites",
            icon: Inbox,
        }
    ];

    return (
        <Sidebar className="bg-gray-200 pt-16 dark:bg-neutral-900">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                {classes && classes.length > 0 ?
                <SidebarGroup>
                    <SidebarGroupLabel>Classes</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {classes.map((item) => (
                                <ClassItem item={item} key={item.id} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    </SidebarGroup>
                    : null}
            </SidebarContent>
        </Sidebar>
    );
}
