"use server";

import { getBanner } from "@/lib/db";
import { getRandomTopic } from "@/lib/gemini";
import { cookies } from "next/headers";

export async function dismissBanner(bannerId: string) {
    if (bannerId === "69420") {
        return;
    }
    const cookieStore = await cookies();
    cookieStore.set("bannerId", bannerId);
    cookieStore.set("bannerDismissed", "true");
}

export async function fetchBanner() {
    return await getBanner();
}

export async function isBannerDismissed() {
    const cookieStore = await cookies();
    const dismissedBannerId = cookieStore.get("bannerId");
    const state = cookieStore.get("bannerDismissed");
    const banner = await getBanner();
    if (banner.id.toString() === dismissedBannerId?.value && state?.value === "true") {
        return true;
    }
    return false;
}

export async function getEvent() {
    const currentEvent = process.env.EVENT || null;
    return currentEvent;
}
