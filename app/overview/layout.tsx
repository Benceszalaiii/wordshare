import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import React from "react";
import { SignInButton } from "../../components/shared/buttons";
export const metadata = {
    title: "Overview",
};
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) {
        return (
            <div className="z-10 flex flex-col items-center justify-center gap-5">
                <div className="text-dark dark:text-light">
                    Please sign in to view this page.
                </div>
                <SignInButton session={session} />
            </div>
        );
    }
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="mx-4 w-full">
                <SidebarTrigger className="" />
                <section className=" ">{children}</section>
            </main>
        </SidebarProvider>
    );
}
