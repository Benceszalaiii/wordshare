import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/options';
import { addGenericPoints, getUserById } from '@/lib/db';
export async function POST(req: NextRequest){
    const session = await getServerSession(authOptions);
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
    const dbUser = await getUserById(session.user.id);
    if (!dbUser){
        return new Response(null, {status: 401});
    }
    const hasRights = dbUser.role === "admin" || (dbUser.role === "teacher" && dbUser.teacherVerified);
    if (!hasRights){
        return new Response("Not enough mana", {status: 401});
    }
    const res = await addGenericPoints(recipientId, points);
    if (!res.ok){
        return new Response("Failed to add points", {status: 500});
    }
    return new Response(res.statusText, {status: 200});
}