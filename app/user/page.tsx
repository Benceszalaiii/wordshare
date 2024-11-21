"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session){
        redirect("/user/" + session.user.id);
    }
    return notFound();
}
