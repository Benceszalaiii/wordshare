"use server";
import {
  Blend,
  Calendar,
  Home,
  Inbox,
  ListTodo,
  LucideProps,
  Notebook,
  Search,
  Settings,
  Shapes,
} from "lucide-react";

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
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Class } from "@prisma/client";
import Link from "next/link";
import { ClassItem } from "./class/sidebaritem";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { getServerSession, Session } from "next-auth";
import { getInvites } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// Menu items.

interface SideBarItem {
  title: string;
  url: string;
  banner?: number;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export async function AppSidebar({
  classes,
}: {
  classes?: Class[] | null;
}) {
    const session = await getServerSession(authOptions);
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
      icon: Blend,
    },
    {
      title: "Invites",
      url: "/class/invites",
      icon: Inbox,
      banner: 0,
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
  ];
  const user = session?.user;
  const invites = await getInvites(user?.id);
  if (invites){
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
                    <SidebarMenuBadge>{item.banner}</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        {classes && classes.length > 0 ? (
          <SidebarGroup>
            <Collapsible defaultOpen={true} className="group/collapsible">
              <SidebarGroupContent>
                <CollapsibleTrigger asChild>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Classes</SidebarMenuButton>
                      <SidebarMenuBadge>{classes.length}</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu>
                    {classes.map((item) => (
                      <ClassItem item={item} key={item.id} />
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
