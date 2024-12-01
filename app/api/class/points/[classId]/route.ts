import { NextRequest } from "next/server";
import { addPoints, getClassPoints, getUserById, isOwnClass } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await auth();
    if (!session){
        return new Response(null, {status: 401});
    }
    const points = await getClassPoints(params.classId, session?.user?.id);
    return new Response(points.toString(), {status: 200});
}

export async function POST(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await auth();
    if (!session){
        return new Response(null, {status: 401});
    }
    const points = parseInt(req.headers.get("points") || "0") || 0;
    const recipientId = req.headers.get("userId");
    if (!points || points === 0){
        return new Response("No points provided or points is 0", {status: 400});
    }
    if (!recipientId){
        return new Response("No userId provided", {status: 400});
    }
    const userId = session?.user?.id;
    const dbUser = await getUserById(userId);
    if (!dbUser){
        return new Response(null, {status: 401});
    }
    const classId = params.classId;
    const hasRights = await isOwnClass(userId, classId) || dbUser.role === "admin";
    if (!hasRights){
        return new Response("Insufficient power", {status: 401});
    }
    const res = await addPoints(classId, recipientId, points);
    if (!res.ok){
        return new Response("Failed to add points", {status: 500});
    }
    return new Response(res.statusText, {status: 200});
}