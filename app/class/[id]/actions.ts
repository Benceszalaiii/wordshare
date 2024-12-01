"use server";

import { auth } from "@/lib/auth";
import {
    getTimeline,
    getTimelineLengths,
    getUserById,
    isPinned,
    pinClassToSidebar,
    unpinClassFromSidebar,
} from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function pinClass(classId: string) {
    const session = await auth();
    if (!session) {
        return false;
    }
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return false;
    }
    const res = await pinClassToSidebar(classId, dbUser.id);
    revalidatePath(`/class/${classId}`, "layout");
    return true;
}

export async function unpinClass(classId: string) {
    const session = await auth();
    if (!session) {
        return false;
    }
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return false;
    }
    const res = await unpinClassFromSidebar(classId, dbUser.id);
    revalidatePath(`/class/${classId}`, "layout");
    return true;
}

export async function getPinStatus(classId: string) {
    const session = await auth();
    if (!session) {
        return false;
    }
    const res = await isPinned(classId, session?.user?.id);
    return res;
}

export async function getTimelineWithOffset(
    classId: string,
    offset: number,
    filter?: "task" | "announcement",
) {
    const session = await auth();
    if (!session) {
        return [];
    }
    const res = await getTimeline(classId, offset, filter);
    return res;
}

export async function getClassTimelineLength(classId: string) {
    const res = await getTimelineLengths(classId);
    return res;
}
