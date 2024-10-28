import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getUserById, isPartofClass, isPinned, pinClassToSidebar, unpinClassFromSidebar } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";



//! PIN CLASS
export async function PUT(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await getServerSession(authOptions);
    if (!session){
        return new Response("Unauthorized", {status: 401});
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser){
        return new Response("Unauthorized", {status: 401});
    }
    // Check if user is a student or teacher of the class or admin
    const hasAccess = await isPartofClass(dbUser.id, params.classId) || dbUser.role === "admin";
    if (!hasAccess){
        return new Response("You are not part of the class.", {status: 401});
    }
    const res = await pinClassToSidebar(params.classId, dbUser.id);
    return new Response(res.statusText, {status: res.status});
}



//! UNPIN CLASS
export async function DELETE(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await getServerSession(authOptions);
    if (!session){
        return new Response("Unauthorized", {status: 401});
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser){
        return new Response("Unauthorized", {status: 401});
    }
    // Check if user is a student or teacher of the class or admin
    const hasAccess = await isPartofClass(dbUser.id, params.classId) || dbUser.role === "admin";
    if (!hasAccess){
        return new Response("You are not part of the class.", {status: 401});
    }
    const res = await unpinClassFromSidebar(params.classId, dbUser.id );
    return new Response(null, {status: res.status, statusText: res.statusText});
}



//! GET PIN STATUS
export async function GET(req: NextRequest, {params}: {params: {classId: string}}){
    const session = await getServerSession(authOptions);
    if (!session){
        return new Response("Unauthorized", {status: 401});
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser){
        return new Response("Unauthorized", {status: 401});
    }
    // Check if user is a student or teacher of the class or admin
    const hasAccess = await isPartofClass(dbUser.id, params.classId) || dbUser.role === "admin";
    if (!hasAccess){
        return new Response("You are not part of the class.", {status: 401});
    }
    const res = await isPinned(params.classId, dbUser.id);
    return new Response(null, {status: 200, statusText: res ? "Pinned" : "Not Pinned"});
}