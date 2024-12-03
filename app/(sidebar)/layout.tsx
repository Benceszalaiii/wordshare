
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({children}: {children: React.ReactNode}) {

    return (
        <SidebarProvider>
        <AppSidebar/>
        <article className={`w-full`}>
            <SidebarTrigger />
            {children}
        </article>
    </SidebarProvider>
    )
}