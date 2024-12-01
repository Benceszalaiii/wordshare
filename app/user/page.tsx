"use server";

import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session && session.user){
        redirect("/user/" + session.user.id);
    }
    return notFound();
}
