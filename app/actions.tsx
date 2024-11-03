"use server";

import { getBanner } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function dismissBanner(bannerId: string){
    cookies().set("bannerId", bannerId);
    cookies().set("bannerDismissed", "true");
}

export async function fetchBanner(){
    return await getBanner();
}