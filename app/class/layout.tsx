"use server";
import "server-only";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getClassById, isTeacherBySession, getClassesByTeacherUser, getUserById, getClassByStudentSession } from '@/lib/db';
import { SignInButton } from "@/components/shared/buttons";
import { notAuthorized } from "@/components/auth";
import { cookies } from "next/headers";
export default async function Layout({
    children,
    params
  }: {
    children: React.ReactNode;
    params: { id: string };
  }){
    const session = await getServerSession(authOptions);

    const teacher = await isTeacherBySession(session);
    const dbUser = await getUserById(session?.user.id);
    const isStudent = dbUser?.role === "student";
    const bannerExists = cookies().get("bannerDismissed")?.value === "false";
    if (isStudent){
      return(
        <SidebarProvider>
        <AppSidebar />
        <article className="w-full">
          <SidebarTrigger />
          <section className="mt-8 mx-4">
          {children}
          </section>
        </article>
      </SidebarProvider>
      )
    }
    return(
      <SidebarProvider>
      <AppSidebar  /> 
      <article className={`w-full`}>
      <SidebarTrigger />
        {children}
      </article>
    </SidebarProvider>
    )
}