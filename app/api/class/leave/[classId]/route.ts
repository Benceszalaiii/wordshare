import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUserById, leaveClass } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("You need to be signed in to access this endpoint.", {status: 401});
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser) {
        return new Response("You need to be signed in to access this endpoint.", {status: 401});
    }
    const res = await leaveClass(params.classId, session.user.id);
    if (!res.ok){
        return new Response("Failed to leave class. It is possible that the mistake is on our side.", {status: 500});
    }
    return new Response("Left class", {status: 200});
}