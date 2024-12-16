"use server";

import { getUser } from "@/lib/db";

export default async function Layout({children}: {children: React.ReactNode}){
    return (
        <section className="px-4 md:px-16">
            {children}
        </section>
    )
}