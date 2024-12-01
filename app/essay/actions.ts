"use server";

import { auth } from "@/lib/auth";
import { dangerouslyRevalidateWordCounts, uploadEssay } from "@/lib/db";
export async function uploadEssayAction(essay: {
    title: string;
    content: string;
    wordCount: number;
}) {
    const session = await auth();

    const user = session?.user;
    if (!user) {
        return new Response(null, {
            status: 401,
            statusText: "No user found.",
        });
    }
    if (!essay.title || !essay.content) {
        return new Response(null, {
            status: 400,
            statusText: "Elemental data missing. Try adding a title/content.",
        });
    }
    const res = await uploadEssay(essay, user.id);
}

export async function revalidateAllEssay(bom: string) {
    return null;
    const res = await dangerouslyRevalidateWordCounts();
    return 1 << 2;
}
