"use server";
import "server-only";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { getClassById, isTeacherBySession, getClassesByTeacherUser, getUserById, getClassByStudentSession } from '@/lib/db';
import { SignInButton } from "@/components/shared/buttons";
import { notAuthorized } from "@/components/auth";
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
    if (isStudent){
      return(
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <section className="mt-8 mx-4">
          {children}
          </section>
        </main>
      </SidebarProvider>
      )
    }
    return(
      <SidebarProvider>
      <AppSidebar  />
      <main className="w-full">
        <SidebarTrigger className="" />
        <section className="mt-8 ">
        {children}
        </section>
      </main>
    </SidebarProvider>
    )
}