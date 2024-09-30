"use server";
import "server-only";
import { getServerSession } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import snappy from 'snappy';

interface Essay{
    title: string;
    content: string;
}

export async function uploadEssay(essay: Essay) {
    const auth = getServerSession(authOptions);
    const a = await auth;
    const user = a?.user;
    if (!user) {
        console.log("User is null");
        return Response.redirect("/api/auth/signin");
    }
    if (!essay.title || !essay.content) {
        console.log("Essay title or content is null");
        return Response.error();
    }
    if (user.email === null) {
        console.log("User email is null");
        return Response.error();
    }
    
    const dbUser = await prisma.user.findUnique({where: {email: user.email}});
    if (!dbUser?.id) {
        console.log("User not found in database");
        return Response.error();
    }
    console.log("Uploading essay to prisma, userid: ", dbUser.id, " name of user: ", dbUser.name);
    const created = await prisma.essay.create({data: {title: essay.title, content: essay.content, userId: dbUser.id}});
    if (!created) {
        console.log("Error creating essay in database");
        return Response.error();
    }
    console.log("Essay created successfully: ", created);
}

export async function getEssays(userId: string){
    const essays = prisma.essay.findMany({where: {userId: userId}});
    return essays;
}