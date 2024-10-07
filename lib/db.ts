"use server";
import "server-only";
import { getServerSession, Session } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Comment, User } from "@prisma/client";
interface Essay {
  title: string;
  content: string;
}

export async function uploadEssay(essay: Essay) {
  const auth = getServerSession(authOptions);
  const a = await auth;
  const user = a?.user;
  if (!user) {
    console.log("User is null");
    return new Response(null, { status: 401, statusText: "No user found." });
  }
  if (!essay.title || !essay.content) {
    console.log("Essay title or content is null");
    return new Response(null, {
      status: 400,
      statusText: "Elemental data missing. Try adding a title/content.",
    });
  }
  if (user.email === null) {
    console.log("User email is null");
    return new Response(null, {
      status: 401,
      statusText: "User has no email connected.",
    });
  }

  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!dbUser?.id) {
    console.log("User not found in database");
    return new Response(null, {
      status: 401,
      statusText: "No user found in database.",
    });
  }
  console.log(
    "Uploading essay to prisma, userid: ",
    dbUser.id,
    " name of user: ",
    dbUser.name,
  );

  const created = await prisma.essay.create({
    data: { title: essay.title, userId: dbUser.id, content: essay.content },
  });
  if (!created) {
    console.log("Error creating essay in database");
    return new Response(null, {
      status: 500,
      statusText:
        "For some reason, the database couldn't handle your request. Try again later.",
    });
  }
  console.log("Essay created successfully: ", created.content);
}

export async function getEssays() {
  const auth = await getServerSession(authOptions);
  const user = auth?.user;
  if (!user) {
    return new Response(null, { status: 401, statusText: "No user found." });
  }
  if (user.email === null) {
    return new Response(null, {
      status: 401,
      statusText: "User has no email connected.",
    });
  }
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!dbUser) {
    return new Response(null, {
      status: 401,
      statusText: "No user found in database.",
    });
  }
  const essays = await prisma.essay.findMany({ where: { userId: dbUser.id } });
  if (!essays) {
    return new Response(null, { status: 404, statusText: "No essays found." });
  }
  return Response.json({ essays: essays });
}
export async function getEssayById(id: string) {
  const essay = await prisma.essay.findUnique({ where: { id: id } });
  if (!essay) {
    return new Response(null, { status: 404, statusText: "Essay not found." });
  }
  return new Response(JSON.stringify(essay), {
    status: 200,
    statusText: "Essay found",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return null;
  }
  return user;
}

export async function isTeacher(id: string) {
  const isTeacher = await prisma.teacher.findUnique({ where: { userId: id } });
  if (!isTeacher) {
    return false;
  }
  return true;
}

export async function deleteEssayByEssayId(essayId: string){
    const auth = await getServerSession(authOptions);
    if (!auth ){
        return new Response(null, { status: 401, statusText: "Please sign in." });
    }
    const user = auth.user;
    if (!user) {
        return new Response(null, { status: 401, statusText: "No user found." });
    }
    if (user.email === null) {
        return new Response(null, {
          status: 401,
          statusText: "User has no email connected.",
        });
    }
    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) {
        return new Response(null, {
            status: 401,
            statusText: "No user found in database.",
        });
    }
    const isTeacherRole = await isTeacher(dbUser.id);
    let success = true;
    if (isTeacherRole) {
        const deleted = await prisma.essay.delete({ where: { id: essayId } });
        if (!deleted) {
        success = false;
        }

    }
    else{
    const deleted = await prisma.essay.delete({ where: { id: essayId, userId: dbUser.id } });
    if (!deleted) {
        success = false;
        }
    }
    if (!success){
        return new Response(null, { status: 500, statusText: "Error deleting essay." });
    }
    return new Response(null, { status: 200, statusText: "Essay deleted." });
}

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return new Response(null, { status: 404, statusText: "User not found." });
  }
    return new Response(JSON.stringify(user), {
        status: 200,
        statusText: "User found",
        headers: { "Content-Type": "application/json" },
    });
}

export async function isOwnEssay(essayId: string){
    const auth = await getServerSession(authOptions);
    const user = auth?.user;
    if (!user) {
        return new Response(null, { status: 401, statusText: "No user found." });
    }
    if (user.email === null) {
        return false;
    }
    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) {
        return false;
    }
    const essay = await prisma.essay.findUnique({ where: { id: essayId } });
    if (!essay) {
        return false;
    }
    if (dbUser.id === essay.userId){
        return true;
    }
    return false;
}


export async function changeRoleById(id: string, value: string | undefined){
    if (!value){
        await prisma.user.update({ where: { id: id }, data: { role: null } });
        return new Response(null, { status: 200, statusText: "User role cleared." });
    }
    const updated = await prisma.user.update({ where: { id: id }, data: { role: value } });
    if (!updated){
        return new Response(null, { status: 500, statusText: "Error updating role." });
    }
    return new Response(null, { status: 200, statusText: "Role updated." });
}


export async function getCommentsByEssayId(essayId: string){
    const comments: Comment[] = await prisma.comment.findMany({ where: { essayId: essayId } });
    return comments;
}


export async function getAllRespondents(comments: Comment[]){
    const userIds = comments.map(comment => comment.userId);
    const users: User[] = await prisma.user.findMany({ where: { id: { in: userIds } } });
    return users;
}

export async function uploadComment(content: string | undefined, author: Session, essayId: string){
  if (!content){
    return new Response(null, { status: 400, statusText: "No content found." });
  }
    const created = await prisma.comment.create({ data: { content: content, userId: author.user.id, essayId: essayId } });
    if (!created){
        return new Response(null, { status: 500, statusText: "Error creating comment." });
    }
    return new Response(null, { status: 200, statusText: "Comment created." });
}