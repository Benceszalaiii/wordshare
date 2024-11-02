import { AltNav } from "@/components/alt-nav";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


export const metadata = {
  title: "Essay"
}
export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <main className="w-full mx-4">
      <SidebarTrigger className="" />
      <section className="">
      {children}
      </section>
    </main>
  </SidebarProvider>
  );
}
