import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata = {
    title: "WordPlay",
};
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="mx-4 w-full">
                <SidebarTrigger className="" />
                <section className="">{children}</section>
            </main>
        </SidebarProvider>
    );
}
