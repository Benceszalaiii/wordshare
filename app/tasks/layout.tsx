import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import * as React from "react";
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
                <SidebarTrigger />
                {children}
            </div>
        </SidebarProvider>
    );
}
