"use server";

import { auth } from "@/lib/auth";
import { changeRole } from "@/lib/db";

export async function setRoleAction(role: "teacher" |"student"){
    const res = await changeRole(role);
    if (res){
        return true;
    }
    return false;
}