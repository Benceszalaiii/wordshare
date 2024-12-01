"use server";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { getUserById, isTeacherBySession } from "@/lib/db";
import { cookies } from "next/headers";
import "server-only";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    const teacher = await isTeacherBySession(session);
    const dbUser = await getUserById(session?.user?.id);
    const isStudent = dbUser?.role === "student";
    const cookieStore = await cookies();
    const bannerExists = cookieStore.get("bannerDismissed")?.value === "false";
    if (isStudent) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <article className="w-full">
                    <SidebarTrigger />
                    <section className="mx-4">{children}</section>
                </article>
            </SidebarProvider>
        );
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <article className={`w-full`}>
                <SidebarTrigger />
                {children}
            </article>
        </SidebarProvider>
    );
}
