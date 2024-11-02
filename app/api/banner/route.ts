import { getBanner } from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
    const bannerId = req.headers.get("bannerId");
    if (!bannerId) {
        return new Response("no bannerId", { status: 400 });
    }
    cookies().set("bannerId", bannerId);
    cookies().set("bannerDismissed", "true");
    return new Response("dismissed", { status: 200 });
}
export async function GET(req: NextRequest) {
    const banner = await getBanner();
    return new Response(JSON.stringify(banner), { status: 200 });
}