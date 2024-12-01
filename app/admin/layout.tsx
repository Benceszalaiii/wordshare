import { AltNav } from "@/components/alt-nav";
import { auth } from "@/lib/auth";
import { isAdmin } from "@/lib/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) {
        return notFound();
    }
    const user = session.user;
    if (!user?.id) {
        return notFound();
    }
    const hasRights = await isAdmin(user.id);
    if (!hasRights) {
        return notFound();
    }
    return (
        <>
            <AltNav
                items={[
                    { title: "Main", path: "/admin" },
                    { title: "Users", path: "/admin/users" },
                    { title: "Verify Status", path: "/admin/verification" },
                    { title: "Teachers", path: "/admin/teacher" },
                    { title: "Class", path: "/admin/class" },
                ]}
            />
            <div className="flex flex-col pl-2 md:pl-24">
                <Suspense>{children}</Suspense>
            </div>
        </>
    );
}
