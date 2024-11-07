import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";
export async function GET(
    req: NextRequest,
    { params }: { params: { classId: string } },
) {
    const classId = params.classId;
    if (!classId) {
        const placeholder = await fetch(
            supabase.storage
                .from("class")
                .getPublicUrl("banner_placeholder.webp").data.publicUrl,
        );
        return new Response(await placeholder.blob(), { status: 404 });
    }
    const res = supabase.storage
        .from("class")
        .getPublicUrl(`${classId}/banner`);
    const imageFetch = await fetch(res.data.publicUrl);
    if (!imageFetch.ok) {
        const placeholder = await fetch(
            supabase.storage
                .from("class")
                .getPublicUrl("banner_placeholder.webp").data.publicUrl,
        );
        return new Response(await placeholder.blob(), { status: 404 });
    }
    const image = await imageFetch.blob();
    return new Response(image, { status: 200 });
}

export async function POST(
    req: NextRequest,
    { params }: { params: { classId: string } },
) {
    const banner = await req.blob();
    const classId = params.classId;
    if (!banner) {
        return new Response("No file provided", { status: 418 });
    }
    if (!classId) {
        return new Response("No classId provided", { status: 418 });
    }
    const res = await supabase.storage
        .from("class")
        .upload(`${classId}/banner`, banner, { upsert: true });
    return new Response(`Successfully uploaded banner`, { status: 200 });
}
