import { auth } from "@/lib/auth";
import { changeRoleById } from "@/lib/db";
import { NextRequest } from "next/server";
import {geolocation} from "@vercel/functions"

export async function GET(req: NextRequest) {
    const role = req.nextUrl.searchParams.get("role")?.toLowerCase() || null;
    if (role !== "teacher" && role !== "student") {
        return new Response(
            `Your request is fabricated, here's your ip address: ${req.headers.get(
                "X-Forwarded-For",
            )}, also heres your location: ${geolocation(req).latitude}, ${geolocation(req).longitude}`,
            { status: 400, statusText: "Invalid role" },
        );
    }
    const session = await auth();
    if (!session?.user || !session) {
        return new Response(null, { status: 401, statusText: "No user found" });
    }
    const user = session.user;
    const res = await changeRoleById(user.id, role);
    if (res.status !== 200) {
        return new Response(null, {
            status: res.status,
            statusText: res.statusText,
        });
    }
    if (!role) {
        return new Response(null, { status: 200, statusText: "Role cleared" });
    }
    return new Response(null, {
        status: 200,
        statusText: `Role set to ${role}`,
    });
}
