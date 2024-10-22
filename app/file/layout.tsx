//? MAKE A NAVBAR FOR NAVIGATING BETWEEN BOOKS, MAYBE SIDEMENU WITH FILE IDS

import FilesSideBar from "@/components/file/sidebar";


export default async function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        <section className="flex flex-col md:flex-row px-4 mx-4 md:pl-16 h-full ">
        <FilesSideBar />
        <article className="space-y-4 grow w-full text-center flex flex-col items-center">
        {children}
        </article>
        </section>
        </>
    )
}
