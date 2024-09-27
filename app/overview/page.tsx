
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { ReactNode } from "react";
import { Warning } from "@/components/alerts";

export default async function Page() {
    const session = await getServerSession(authOptions);
    return (
        <div className="min-w-screen flex flex-col items-center justify-center ">
        <p className="text-dark dark:text-light z-10">Welcome back {session?.user?.name }</p>
        <Warning  >This page is a stub and is under renovations. You will find your active tasks here</Warning>
        </div>
    )
}