"use server";

import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";

export async function getBannerWithFallback(
    source: string,
    classId: string,
) {
    if (source === "banner") {
        const res = await fetch(
            `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/banner`,
        );
        if (!res.ok) {
            const fallbackRes = await fetch(
                `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/banner_placeholder.webp`,
            );
            return JSON.stringify({ status: 201, blob: await fallbackRes.blob() });
        }
        return JSON.stringify({ status: 201, blob: await res.blob() });
    }
    if (source === "icon") {
        const res = await fetch(
            `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/icon`,
        );
        if (!res.ok) {
            const fallbackRes = await fetch(
                `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/icon_placeholder.webp`,
            );
            return JSON.stringify({ status: 201, blob: await fallbackRes.blob() });
        }
        return JSON.stringify({ status: 201, blob: await res.blob() });
    }
    const fallbackRes = await fetch(
        `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/banner_placeholder.webp`,
    );
    return JSON.stringify({ status: 201, blob: await fallbackRes.blob() });
}

export async function getBannerUrlWithFallback(
    source: string,
    classId: string,
) {
    if (!classId)
        return source === "banner"
            ? "https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/banner_placeholder.webp"
            : "https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/icon_placeholder.webp";
    if (source === "banner") {
        const res = await fetch(
            `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/banner`,
        );
        if (!res.ok)
            return `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/banner_placeholder.webp`;
        return `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/banner`;
    }
    if (source === "icon") {
        const res = await fetch(
            `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/icon`,
        );
        if (!res.ok)
            return `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/icon_placeholder.webp`;
        
        return `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/icon`;
    }
    return `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${classId}/banner`;
}

export async function uploadImage(
    reqFileUrl: string,
    classId: string,
    type: string,
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return { message: "Unauthorized", status: 401 };
    }
    const file = await (await fetch(reqFileUrl)).blob();
    if (!file) {
        return { message: "No file provided", status: 418 };
    }
    if (file.size > 8 * 1024 * 1024) {
        return { message: "File too large. Maximum upload size is 8MB.", status: 413 };
    }
    if (type === "banner") {
        const res = await supabase.storage
            .from("class")
            .upload(`${classId}/banner`, file, { upsert: true });
        if (res.error)
            return { message: "Error uploading file: " + res.error.message, status: 500 };
        revalidatePath(`/class/${classId}/`);
        return { message: "Successfully uploaded banner", status: 200 };
    }
    if (type === "icon") {
        const res = await supabase.storage
            .from("class")
            .upload(`${classId}/icon`, file, { upsert: true });
        if (res.error)
            return { message: "Error uploading file: " + res.error.message, status: 500 };
        revalidatePath(`/class/${classId}/`);
        return { message: "Successfully uploaded icon", status: 200 };
    }
    return { message: "Invalid type", status: 418 };
}
