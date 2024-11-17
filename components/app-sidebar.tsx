"use server";
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

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { getClassesByIds, getInvites, getUserById } from "@/lib/db";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { getServerSession } from "next-auth";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { ClassContextWrapper } from "./class/class-context";
import { ClassItem } from "./class/sidebaritem";

// Menu items.

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
];
export async function AppSidebar() {
    const session = await getServerSession(authOptions);

    const user = session?.user;
    const invites = await getInvites(user?.id);
    const dbUser = await getUserById(user?.id);
    const getCurrentItems = (): SideBarItem[] => {
        switch (dbUser?.role) {
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
    const navigation = getCurrentItems();
    const classes = await getClassesByIds(dbUser?.pinnedClassIds || []);
    if (invites && navigation.find((x) => x.title === "Invites")) {
        navigation.find((x) => x.title === "Invites")!.banner = invites.length;
    }
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
                                    {item.banner ? (
                                        <SidebarMenuBadge>
                                            {item.banner}
                                        </SidebarMenuBadge>
                                    ) : null}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                {classes && classes.length > 0 ? (
                    <SidebarGroup>
                        <Collapsible
                            defaultOpen={true}
                            className="group/collapsible"
                        >
                            <SidebarGroupContent>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                Pinned Classes
                                            </SidebarMenuButton>
                                            <SidebarMenuBadge>
                                                {classes.length}
                                            </SidebarMenuBadge>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenu>
                                        {classes.map((item) => (
                                            <ClassContextWrapper
                                                canEdit={
                                                    item.teacherUserId ===
                                                        dbUser?.id ||
                                                    dbUser?.role === "admin"
                                                }
                                                currentClassName={item.name}
                                                key={item.id}
                                                classId={item.id}
                                            >
                                                <ClassItem item={item} />
                                            </ClassContextWrapper>
                                        ))}
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </SidebarGroupContent>
                        </Collapsible>
                    </SidebarGroup>
                ) : null}
            </SidebarContent>
            <SidebarFooter className="w-full justify-end">
                <div
                    className="flex flex-row items-center justify-end gap-1 px-4 text-gray-800 dark:text-gray-400"
                    title="Press ⌘B to toggle sidebar"
                >
                    ⌘B
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
