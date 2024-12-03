import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
export default function NotFound(){

    return(
      <>
      <AppSidebar />
      <main>
        <SidebarTrigger/>
        <section className="mt-24 ml-24">
        <h1>The class you are looking for does not exist.</h1>
        </section>
      </main>
    </>
    )
}