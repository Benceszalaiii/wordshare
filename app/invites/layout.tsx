"use server";
import "server-only";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { isTeacherBySession, getClassesByTeacherUser, getUserById, getClassByStudentSession } from '@/lib/db';
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
    if (!session){
      return notAuthorized("Classes");
    }
    const teacher = await isTeacherBySession(session);
    const dbUser = await getUserById(session.user.id);
    if (!dbUser){
      return (
        <section className="flex flex-col gap-4 items-center justify-center">
          <h1>User not found in database</h1>
          <SignInButton session={session}></SignInButton>
        </section>
      )
    }
    const isStudent = dbUser.role === "student";
    if (!session){
      return (
        <section className="flex flex-col gap-4 justify-center items-center">
          <h1>Not authenticated</h1>
          <SignInButton session={session}></SignInButton>
        </section>
      );
    }
    if (isStudent){
      const classes = await getClassByStudentSession(session)
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
    const classes = await getClassesByTeacherUser(session?.user.id);
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