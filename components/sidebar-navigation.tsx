"use client";

import {
    Blend,
    Home,
    Inbox,
    LayoutDashboard,
    ListTodo,
    LucideProps,
    Notebook,
    Shapes,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";

interface SideBarItem {
    title: string;
    url: string;
    banner?: number;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
}

const studentItems: SideBarItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Invites",
        url: "/invites",
        icon: Inbox,
        banner: 0,
    },
    {
        title: "Classes",
        url: "/class",
        icon: Shapes,
    },
    {
        title: "Essay",
        url: "/essay",
        icon: Notebook,
    },
    {
        title: "WordPlay",
        url: "/wordplay",
        icon: Blend,
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: ListTodo,
    },
];
const defaultNavigation: SideBarItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Classes",
        url: "/class",
        icon: Shapes,
    },
    {
        title: "WordPlay",
        url: "/wordplay",
        icon: Blend,
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: ListTodo,
    },
];
const teacherNavigation: SideBarItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Classes",
        url: "/class",
        icon: Shapes,
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: ListTodo,
    },
    {
        title: "WordPlay",
        url: "/wordplay",
        icon: Blend,
    },
];
const adminNavigation: SideBarItem[] = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/admin/",
        icon: LayoutDashboard,
    },
    {
        title: "Classes",
        url: "/class",
        icon: Shapes,
    },
    {
        title: "WordPlay",
        url: "/wordplay",
        icon: Blend,
    },
    {
        title: "Tasks",
        url: "/tasks",
        icon: ListTodo,
    },
    {
        title: "Invites",
        url: "/invites",
        icon: Inbox,
        banner: 0,
    },
    {
        title: "Essay",
        url: "/essay",
        icon: Notebook,
    },
];

export default function SidebarNavigationMenu({
    role,
    invites,
}: {
    role?: string | null;
    invites?: number;
}) {
    const path = usePathname();
    const getCurrentItems = (): SideBarItem[] => {
        switch (role) {
            case "admin":
                return adminNavigation;
            case "teacher":
                return teacherNavigation;
            case "student":
                return studentItems;
            default:
                return defaultNavigation;
        }
    };
    const items = getCurrentItems();
    return (
        <>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                        <Link
                            href={item.url}
                            className={item.url === path ? "font-bold" : ""}
                        >
                            <item.icon />
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                    {item.title === "Invites" ? (
                        <SidebarMenuBadge>{invites}</SidebarMenuBadge>
                    ) : null}
                </SidebarMenuItem>
            ))}
        </>
    );
}
