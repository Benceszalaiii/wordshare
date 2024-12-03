"use server";

import { auth } from "@/lib/auth";
import { uploadEssay } from "@/lib/db";
import { uploadEssayContent } from "@/lib/supabase";
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
    if (!res) {
        return new Response(null, {
            status: 500,
            statusText: "Error uploading essay.",
        });
    }
     const data = await uploadEssayContent(res.id, res.userId, essay.content);
     return data;
}
