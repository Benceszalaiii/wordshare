"use server"


import { auth } from "@/lib/auth";
import { changePrivacyById } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function changePrivacy(userId: string, updatedState: boolean){
    const session = await auth();
    if (session?.user?.id !== userId){
        return;
    }
    const res = await changePrivacyById(session.user.id, updatedState);
    if (!res){
        return false
    }
    revalidatePath(`/user/${userId}`)
    return true
}