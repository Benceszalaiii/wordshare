"use server";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    SidebarSeparator
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { getClassesByIds, getInvites, getUserById } from "@/lib/db";
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
        <Sidebar collapsible="icon" className="bg-gray-200 pt-20 dark:bg-neutral-900">
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
                            <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarGroupLabel>
                                                Pinned Classes
                                            </SidebarGroupLabel>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
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
                            </SidebarGroupContent>
                    </SidebarGroup>
                ) : null}
            </SidebarContent>
            <SidebarFooter className="w-full justify-end text-gray-800 dark:text-gray-400 group-data-[collapsible=icon]:ml-auto">
                <div
                    className="flex flex-row items-center justify-end gap-1 px-4 group-data-[collapsible=icon]:pr-2"
                    title="Press ⌘B to toggle sidebar"
                >
                    ⌘B
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
