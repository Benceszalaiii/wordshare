"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUserById, isTeacherBySession } from "@/lib/db";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import "server-only";
export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { id: string };
}) {
    const session = await getServerSession(authOptions);

    const teacher = await isTeacherBySession(session);
    const dbUser = await getUserById(session?.user.id);
    const isStudent = dbUser?.role === "student";
    const bannerExists = cookies().get("bannerDismissed")?.value === "false";
    if (isStudent) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <article className="w-full">
                    <SidebarTrigger />
                    <section className="mx-4 mt-8">{children}</section>
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
