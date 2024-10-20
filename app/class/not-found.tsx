import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Session } from 'next-auth';
export default function NotFound(){

    return(
      <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger/>
        <section className="mt-24 ml-24">
        <h1>The class you are looking for does not exist.</h1>
        </section>
      </main>
    </SidebarProvider>
    )
}