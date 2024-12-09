"use server";

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
import { auth } from "@/lib/auth";
import { getClassesByIds, getInvites, getUserById } from "@/lib/db";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ClassContextWrapper } from "./class/class-context";
import { ClassItem } from "./class/sidebaritem";
import SidebarRefresher from "./sidebar-navigation";

//? Find navigation items for the sidebar in the sidebar-navigation.tsx file

export async function AppSidebar() {
    const session = await auth();
    const user = session?.user;
    const invites = await getInvites(user?.id);
    const dbUser = await getUserById(user?.id);
    const classes = await getClassesByIds(dbUser?.pinnedClassIds || []);
    return (
        <Sidebar className="bg-gray-200 pt-20 dark:bg-neutral-900">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarRefresher
                                invites={invites?.length}
                                role={dbUser?.role}
                            />
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
                                                    item.teacherId ===
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
