"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/options"
import { changePrivacyById } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function changePrivacy(userId: string, updatedState: boolean){
    const session = await getServerSession(authOptions);
    if (session?.user.id !== userId){
        return;
    }
    const res = await changePrivacyById(session.user.id, updatedState);
    if (!res){
        return false
    }
    revalidatePath(`/user/${userId}`)
    return true
}