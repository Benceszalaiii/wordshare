import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { notFound } from "next/navigation";
import { isAdmin } from "@/lib/db";
import { Suspense } from 'react';
import { AltNav } from "@/components/alt-nav";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    if (!session){
        return notFound();
    }
    const user = session.user;
    const hasRights = await isAdmin(user.id);
    if (!hasRights){
        return notFound();
    }
    return (
        <>
        <AltNav items={[
            {title: "Main", path: "/admin"},
            { title: "Users", path: "/admin/users" },
            { title: "Verify Status", path: "/admin/verification" },
            {title: "Teachers", path: "/admin/teacher"},
            {title: "Class", path: "/admin/class"},
        ]} />
        <div className="ml-24 flex flex-col">
            <Suspense>
            {children}
            </Suspense>
        </div>
        </>
    )
}