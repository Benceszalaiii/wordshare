"use server";
import "server-only";
import { getServerSession, Session } from "next-auth";
import prisma from "./prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Comment, User, Class } from "@prisma/client";
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

export async function getUserById(id: string | null | undefined): Promise<User | null> {
  if (!id){
    return null;
  }
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return null;
  }
  return user;
}

export async function isAdmin(id: string) {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return false;
  }
  if (user.role === "admin") {
    return true;
  }
  return false;
}

export async function isTeacher(id: string) {
  const isTeacher = await prisma.teacher.findUnique({ where: { userId: id } });
  const admin = await isAdmin(id);
  if (isTeacher || admin) {
    return true;
  }
  return false;
}

export async function deleteEssayByEssayId(essayId: string) {
  const auth = await getServerSession(authOptions);
  if (!auth) {
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
  } else {
    const deleted = await prisma.essay.delete({
      where: { id: essayId, userId: dbUser.id },
    });
    if (!deleted) {
      success = false;
    }
  }
  if (!success) {
    return new Response(null, {
      status: 500,
      statusText: "Error deleting essay.",
    });
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

export async function isOwnEssay(essayId: string) {
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
  if (dbUser.id === essay.userId) {
    return true;
  }
  return false;
}

export async function changeRoleById(id: string, value: string | null) {
  const updated = await prisma.user.update({
    where: { id: id },
    data: { role: value },
  });
  if (!updated) {
    return new Response(null, {
      status: 500,
      statusText: "Error updating role.",
    });
  }
  if (!value) {
    await prisma.user.update({ where: { id: id }, data: { role: null } });
    return new Response(null, {
      status: 200,
      statusText: "User role cleared.",
    });
  }
  return new Response(null, { status: 200, statusText: "Role updated." });
}

export async function getCommentsByEssayId(essayId: string) {
  const comments: Comment[] = await prisma.comment.findMany({
    where: { essayId: essayId },
  });
  return comments;
}

export async function getAllRespondents(comments: Comment[]) {
  const userIds = comments.map((comment) => comment.userId);
  const users: User[] = await prisma.user.findMany({
    where: { id: { in: userIds } },
  });
  return users;
}

export async function uploadComment(
  content: string | undefined,
  author: Session,
  essayId: string,
) {
  if (!content) {
    return new Response(null, { status: 400, statusText: "No content found." });
  }
  const created = await prisma.comment.create({
    data: { content: content, userId: author.user.id, essayId: essayId },
  });
  if (!created) {
    return new Response(null, {
      status: 500,
      statusText: "Error creating comment.",
    });
  }
  return new Response(null, { status: 200, statusText: "Comment created." });
}

export async function getRoadmap() {
  const roadmap = await prisma.roadMap.findMany();
  return roadmap;
}

export async function uploadRoadmap(title: string, content: string) {
  if (!title || !content) {
    return new Response(null, {
      status: 400,
      statusText: "No title or content found.",
    });
  }
  const created = await prisma.roadMap.create({
    data: { title: title, description: content },
  });
  if (!created) {
    return new Response(null, {
      status: 500,
      statusText: "Error creating roadmap.",
    });
  }
  return new Response(null, { status: 200, statusText: "Roadmap created." });
}

export async function deleteRoadmap(id: number) {
  const deleted = await prisma.roadMap.delete({ where: { id: id } });
  if (!deleted) {
    return new Response(null, {
      status: 500,
      statusText: "Error deleting roadmap.",
    });
  }
  return new Response(null, { status: 200, statusText: "Roadmap deleted." });
}

export async function MarkRoadmapDone(id: number) {
  const updated = await prisma.roadMap.update({
    where: { id: id },
    data: { date: new Date(Date.now()) },
  });
  if (!updated) {
    return new Response(null, {
      status: 500,
      statusText: "Error updating roadmap.",
    });
  }
  return new Response(null, { status: 200, statusText: "Roadmap updated." });
}

export async function MarkRoadmapUndone(id: number) {
  const updated = await prisma.roadMap.update({
    where: { id: id },
    data: { date: null },
  });
  if (!updated) {
    return new Response(null, {
      status: 500,
      statusText: "Error updating roadmap.",
    });
  }
  return new Response(null, { status: 200, statusText: "Roadmap updated." });
}

export async function getAllUsers() {
  const users = await prisma.user.findMany();
  return users;
}

export async function getVerifyRequests() {
  const requests = await prisma.user.findMany({
    where: { teacherVerified: false, role: "teacher" },
  });
  return requests;
}

export async function addTeacher(userId: string) {
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { teacherVerified: true },
  });
  const teacher = await prisma.teacher.create({ data: { userId: userId } });
  if (!updated || !teacher) {
    return new Response(null, {
      status: 500,
      statusText: "Error adding teacher.",
    });
  }
  return new Response(null, { status: 200, statusText: "Teacher added." });
}

export async function deleteTeacher(userId: string) {
  const deleted = await prisma.teacher.delete({ where: { userId: userId } });
  if (!deleted) {
    return new Response(null, {
      status: 500,
      statusText: "Error deleting teacher.",
    });
  }
  return new Response(null, { status: 200, statusText: "Teacher deleted." });
}

export async function getTeacher(userId: string) {
  const teacher = await prisma.teacher.findUnique({
    where: { userId: userId },
  });
  return teacher;
}

interface ClassObject {
  classname: string;
  description: string;
  language: string;
}

export async function createClass(datajson: ClassObject) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Please sign in", {
      status: 401,
      statusText: "Please sign in.",
    });
  }
  const user = session.user;
  if (!user) {
    return new Response("No user found.", {
      status: 401,
      statusText: "No user found.",
    });
  }
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    return new Response("No user found", {
      status: 401,
      statusText: "No user found.",
    });
  }
  let teacher = await getTeacher(dbUser.id);
  const admin = await isAdmin(dbUser.id);
  if (!(teacher || admin)) {
    return new Response("You are not a teacher.", {
      status: 401,
      statusText: "You are not a teacher.",
    });
  }
  if (admin && !teacher) {
    await addTeacher(dbUser.id);
    teacher = await getTeacher(dbUser.id);
  }
  if (!datajson.classname || !datajson.language) {
    return new Response(null, {
      status: 400,
      statusText: "No name, language or teacherId found.",
    });
  }
  if (!teacher) {
    return new Response(null, {
      status: 401,
      statusText: "You are not a verified teacher.",
    });
  }
  const newclass = await prisma.class.create({
    data: {
      name: datajson.classname,
      description: datajson.description,
      language: datajson.language,
      teacherId: teacher.id,
      teacherUserId: dbUser.id,
    },
  });

  if (!newclass) {
    return new Response(null, {
      status: 500,
      statusText: "Error creating class.",
    });
  }
  return new Response(null, { status: 200, statusText: "Class created." });
}

export async function getClassByStudentSession(session: Session | null) {
  if (!session) {
    return null;
  }
  const user = session.user;
  const classes = await prisma.class.findMany({
    where: { students: { some: { id: user.id } } },
  });
  return classes;
}

export async function getClassesByTeacherUser(userId: string | undefined) {
  if (!userId) {
    return null;
  }
  const classes = await prisma.class.findMany({
    where: { teacherUserId: userId },
  });
  return classes;
}

export async function getClassById(id: string | null) {
  if (!id) {
    return null;
  }
  const c = await prisma.class.findUnique({ where: { id: id } });
  return c;
}

export async function isTeacherBySession(session: Session | null) {
  if (!session || session?.user) {
    return false;
  }
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return false;
  }
  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
  });
  if (!teacher) {
    return false;
  }
  return true;
}

export async function getAllClasses() {
  const classes = await prisma.class.findMany();
  return classes;
}

export async function getInvites(userId: string | undefined | null) {
  if (!userId) {
    return null;
  }
  const invites = await prisma.invite.findMany({ where: { userId: userId } });
  return invites;
}

export async function getAllStudents() {
  const students = await prisma.user.findMany({ where: { role: "student" } });
  return students;
}

export async function isOwnClass(userId: string, classId: string) {
  const c = await prisma.class.findUnique({ where: { id: classId } });
  if (!c) {
    return false;
  }
  if (c.teacherUserId === userId) {
    return true;
  }
  return false;
}

//! Should be validated by API endpoint or other means.
export async function inviteUser(
  classId: string,
  userId: string,
  inviterId: string,
) {
  const exists = await prisma.invite.findFirst({
    where: { userId: userId, classId: classId },
  });
  if (exists) {
    return new Response(null, {
      status: 208,
      statusText: "User already invited.",
    });
  }
  const inclass = await prisma.class.findFirst({
    where: { id: classId, students: { some: { id: userId } } },
  });
  if (inclass) {
    return new Response(null, {
      status: 409,
      statusText: "User already in class.",
    });
  }
  const invite = await prisma.invite.create({
    data: { userId: userId, classId: classId, inviterId: inviterId },
  });
  if (!invite) {
    return new Response(null, {
      status: 500,
      statusText: "Error inviting user.",
    });
  } else {
    return new Response(null, {
      status: 200,
      statusText: "Invite successful.",
    });
  }
}

export async function acceptInvite(classId: string, user: User) {
  const updated = await prisma.class.update({
    where: { id: classId },
    data: { students: { connect: { id: user.id } } },
  });
  if (!updated) {
    return new Response(null, {
      status: 500,
      statusText: "Error accepting invite.",
    });
  }
  return new Response(null, { status: 200, statusText: "Invite accepted." });
}

export async function deleteInvite(inviteId: string) {
  const deleted = await prisma.invite.delete({ where: { id: inviteId } });
  if (!deleted) {
    return new Response(null, {
      status: 500,
      statusText: "Error declining invite.",
    });
  }
  return new Response(null, { status: 200, statusText: "Invite declined." });
}

export async function getClassStudentsByClassId(classId: string) {
  const students = await prisma.class.findUnique({
    where: { id: classId },
    include: { students: true },
  });
  return students;
}

export async function leaveClass(classId: string, userId: string) {
  const updated = await prisma.class.update({
    where: { id: classId },
    data: { students: { disconnect: { id: userId } } },
  });
  if (!updated) {
    return new Response(null, {
      status: 500,
      statusText: "Error leaving class.",
    });
  }
  return new Response(null, { status: 200, statusText: "Left class." });
}

export async function isStudentofClass(classId: string, userId: string) {
  const currentClass = await prisma.class.findUnique({
    where: { id: classId },
    include: { students: true },
  });
  if (!currentClass) {
    return false;
  }
  currentClass.students.filter((student)=> student.id === userId);

  return currentClass.students.length > 0;
}
