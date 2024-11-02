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
    children
  }: {
    children: React.ReactNode;
  }){
      return(
        <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="" />
          <section className=" mx-4">
          {children}
          </section>
        </main>
      </SidebarProvider>
      )
}