
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <SidebarProvider>
        <AppSidebar/>
        <article className={`w-full`}>
            {/* <VisuallyHidden>
            <SidebarTrigger />
            </VisuallyHidden> */}
            {children}
        </article>
    </SidebarProvider>
    )
}