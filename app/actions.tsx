"use server";

import { getBanner } from "@/lib/db";
import { cookies } from "next/headers";

export async function dismissBanner(bannerId: string) {
    if (bannerId === "69420") {
        return;
    }
    cookies().set("bannerId", bannerId);
    cookies().set("bannerDismissed", "true");
}

export async function fetchBanner() {
    return await getBanner();
}

export async function isBannerDismissed() {
    const dismissedBannerId = cookies().get("bannerId");
    const state = cookies().get("bannerDismissed");
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
