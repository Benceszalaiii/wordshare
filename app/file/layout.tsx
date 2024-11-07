//? MAKE A NAVBAR FOR NAVIGATING BETWEEN BOOKS, MAYBE SIDEMENU WITH FILE IDS

import FilesSideBar from "@/components/file/sidebar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <section className="mx-4 flex h-full flex-col px-4 md:flex-row md:pl-16 ">
                <FilesSideBar />
                <article className="flex w-full grow flex-col items-center space-y-4 text-center">
                    {children}
                </article>
            </section>
        </>
    );
}
