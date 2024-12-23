"use server";
import { Class, Comment, User } from "@prisma/client";
import { Session } from "next-auth";
import "server-only";
import { auth } from "./auth";
import { sendInviteMail } from "./aws";
import prisma from "./prisma";
interface Essay {
    title: string;
    content: string;
    wordCount: number;
}

export async function getUser() {
    const session = await auth();
    if (!session) {
        return null;
    }
    const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
    });
    return dbUser;
}

export async function uploadEssay(essay: Essay, userId: string) {
    const created = await prisma.essay.create({
        data: {
            title: essay.title,
            userId: userId,
            wordCount: essay.wordCount,
        },
    });
    return created;
}

export async function getEssaysByUserId(userId: string) {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { Essay: true },
    });
    return dbUser?.Essay || [];
}

export async function getSubmissionById(taskId: number, userId: string) {
    const submitted = await prisma.submission.findFirst({
        where: { taskId: taskId, userId: userId },
    });
    return submitted;
}

export async function getEssays() {
    const session = await auth();
    const user = session?.user;
    if (!user) {
        return [];
    }
    const dbUser = await prisma.user.findUnique({
        where: { id: user.id },
    });
    if (!dbUser) {
        return [];
    }
    const essays = await prisma.essay.findMany({
        where: { userId: dbUser.id },
    });
    return essays;
}
export async function getEssayById(id: string) {
    const essay = await prisma.essay.findUnique({
        where: { id: id },
        include: { Score: true },
    });
    if (!essay) {
        return null;
    }
    return essay;
}

export async function getUserById(
    id: string | null | undefined,
): Promise<User | null> {
    if (!id) {
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
    const isTeacher = await prisma.teacher.findUnique({
        where: { userId: id },
    });
    const admin = await isAdmin(id);
    if (isTeacher || admin) {
        return true;
    }
    return false;
}

export async function deleteEssayByEssayId(essayId: string) {
    const session = await auth();
    if (!session) {
        return new Response(null, {
            status: 401,
            statusText: "Please sign in.",
        });
    }
    const user = session.user;
    if (!user) {
        return new Response(null, {
            status: 401,
            statusText: "No user found.",
        });
    }
    if (user.email === null) {
        return new Response(null, {
            status: 401,
            statusText: "User has no email connected.",
        });
    }
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
    });
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

export async function isOwnEssay(essayId: string) {
    const session = await auth();
    const user = session?.user;
    if (!user) {
        return new Response(null, {
            status: 401,
            statusText: "No user found.",
        });
    }
    if (user.email === null) {
        return false;
    }
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
    });
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

export async function changeRole(value: "teacher" | "student") {
    const dbUser = await getUser();
    if (!dbUser) {
        throw new Error("No user found.");
    }
    const updated = await prisma.user.update({
        where: { id: dbUser.id },
        data: { role: value },
    });
    if (value === "student") {
        await prisma.teacher.delete({ where: { userId: dbUser.id } });
    }
    if (value === "teacher") {
        await prisma.teacher.create({ data: { userId: dbUser.id } });
    }
    return updated;
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
        return new Response(null, {
            status: 400,
            statusText: "No content found.",
        });
    }
    if (!author.user?.id) {
        return new Response(null, {
            status: 401,
            statusText: "Please sign in.",
        });
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

interface ClassDataProps {
    name: string;
    description: string;
    language: string;
    teacherId: string;
}

export async function createClass(classData: ClassDataProps) {
    const newclass = await prisma.class.create({
        data: {
            name: classData.name,
            description: classData.description,
            language: classData.language,
            teacherId: classData.teacherId,
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
    if (!session.user) {
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
        return [];
    }
    const classes = await prisma.class.findMany({
        where: { teacherId: userId },
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

export async function getClassWithTasks(classId: string) {
    const c = await prisma.class.findUnique({
        where: { id: classId },
        include: { Tasks: true },
    });
    return c;
}

export async function isOwnClass(userId: string | undefined, classId: string) {
    if (!userId) {
        return false;
    }
    const c = await prisma.class.findUnique({ where: { id: classId } });
    if (!c) {
        return false;
    }
    if (c.teacherId === userId) {
        return true;
    }
    return false;
}

export async function getClassPoints(
    classId: string,
    userId: string | undefined,
) {
    if (!userId) {
        return 0;
    }
    const points = await prisma.points.findFirst({
        where: { userId: userId, classId: classId },
    });
    if (!points) {
        await initializePoints(userId, classId);
        return 0;
    }
    return points.points;
}

//! Should be validated by API endpoint or other means.
export async function inviteUser(
    classId: string,
    userId: string,
    inviterId: string | undefined,
) {
    if (!inviterId) {
        return new Response(null, {
            status: 400,
            statusText: "Inviter user not found.",
        });
    }
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
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    const currentClass = await prisma.class.findUnique({
        where: { id: classId },
    });
    const inviter = await prisma.user.findUnique({ where: { id: inviterId } });
    if (!inviter || !dbUser || !currentClass) {
        return new Response(null, {
            status: 500,
            statusText: "Error inviting user.",
        });
    }
    const invite = await prisma.invite.create({
        data: { userId: userId, classId: classId, inviterId: inviterId },
    });
    if (!dbUser.email) {
        return new Response("User has no email connected.", { status: 400 });
    }
    if (!inviter.email) {
        return new Response("Inviter has no email connected.", { status: 400 });
    }
    if (!inviter.name) {
        return new Response("Inviter has no name.", { status: 400 });
    }
    if (!dbUser.name) {
        return new Response("User has no name.", { status: 400 });
    }
    if (!currentClass.name) {
        return new Response("Class has no name.", { status: 400 });
    }
    const res = await sendInviteMail({
        to: [dbUser.email],
        sender: { email: inviter.email, name: inviter.name },
        class_name: currentClass.name,
        action_url: `https://wordshare.tech/invites/${invite.id}`,
        receiver_name: dbUser.name,
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
        include: { students: true, Points: true },
    });
    return students;
}

export async function leaveClass(classId: string, userId: string | undefined) {
    if (!userId) {
        return new Response(null, {
            status: 500,
            statusText: "Error leaving class. No user found.",
        });
    }
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

export async function deletePoints(userId: string, classId: string) {
    const point = await prisma.points.findFirst({
        where: { userId: userId, classId: classId },
    });
    if (!point) {
        return new Response(null, {
            status: 404,
            statusText: "Points not found.",
        });
    }
    const deleted = await prisma.points.delete({ where: { id: point.id } });
    if (!deleted) {
        return new Response(null, {
            status: 500,
            statusText: "Error deleting points.",
        });
    }
    return new Response(null, { status: 200, statusText: "Points deleted." });
}

export async function isStudentofClass(classId: string, userId: string) {
    const currentClass = await prisma.class.findUnique({
        where: { id: classId },
        include: { students: true },
    });
    if (!currentClass) {
        return false;
    }
    return (
        currentClass.students.filter((student) => student.id === userId)
            .length > 0
    );
}

// CLASS PIN FUNCTIONS

export async function pinClassToSidebar(classId: string, userId: string) {
    const pinned = await prisma.user.update({
        where: { id: userId },
        data: { pinnedClassIds: { push: classId } },
    });
    if (!pinned) {
        return new Response(null, {
            status: 500,
            statusText: "Error pinning class.",
        });
    }
    return new Response(null, { status: 200, statusText: "Class pinned." });
}

export async function unpinClassFromSidebar(classId: string, userId: string) {
    const pins = await prisma.user.findUnique({
        where: { id: userId },
        select: { pinnedClassIds: true },
    });
    if (!pins) {
        return new Response(null, {
            status: 500,
            statusText: "Error finding pinned classes.",
        });
    }
    if (!pins.pinnedClassIds.includes(classId)) {
        return new Response(null, {
            status: 200,
            statusText: "Class not pinned.",
        });
    }
    const unpinned = await prisma.user.update({
        where: { id: userId },
        data: {
            pinnedClassIds: pins.pinnedClassIds.filter(
                (id: string) => id !== classId,
            ),
        },
    });
    if (!unpinned) {
        return new Response(null, {
            status: 500,
            statusText: "Error unpinning class.",
        });
    }
    return new Response(null, { status: 200, statusText: "Class unpinned." });
}

export async function isPinned(classId: string, userId: string | undefined) {
    if (!userId) {
        return false;
    }
    const pins = await prisma.user.findUnique({
        where: { id: userId },
        select: { pinnedClassIds: true },
    });
    if (!pins) {
        return false;
    }
    return pins.pinnedClassIds.includes(classId);
}

export async function isPartofClass(userId: string, classId: string) {
    const currentClass = await prisma.class.findUnique({
        where: { id: classId },
        include: { students: true },
    });
    if (!currentClass) {
        return false;
    }
    const isStudent = currentClass.students.some(
        (student) => student.id === userId,
    );
    const isTeacher = currentClass.teacherId === userId;
    return isStudent || isTeacher;
}

export async function AnnounceClass(data: {
    title: string;
    content: string;
    classId: string;
}) {
    const currentClass = await prisma.class.findUnique({
        where: { id: data.classId },
    });
    if (!currentClass) {
        return new Response(null, {
            status: 404,
            statusText: "Class not found.",
        });
    }
    const announcement = await prisma.announcement.create({
        data: {
            title: data.title,
            content: data.content,
            classId: data.classId,
        },
    });
    if (!announcement) {
        return new Response(null, {
            status: 500,
            statusText: "Error creating announcement.",
        });
    }
    return new Response(null, {
        status: 200,
        statusText: "Announcement created.",
    });
}

export async function getAnnouncementsByClassId(classId: string) {
    const announcements = await prisma.announcement.findMany({
        where: { classId: classId },
    });
    return announcements;
}

export async function getTasksByClassId(classId: string) {
    const currentClass = await prisma.class.findUnique({
        where: { id: classId },
        include: { Tasks: true },
    });
    return currentClass?.Tasks || [];
}

export async function uploadTask(data: {
    title: string;
    content: string;
    dueDate: string;
    classId: string;
}) {
    const currentClass = await prisma.class.findUnique({
        where: { id: data.classId },
    });
    if (!currentClass) {
        return new Response(null, {
            status: 404,
            statusText: "Class not found.",
        });
    }
    const task = await prisma.task.create({
        data: {
            title: data.title,
            content: data.content,
            dueDate: new Date(data.dueDate),
            classId: data.classId,
        },
    });
    if (!task) {
        return new Response(null, {
            status: 500,
            statusText: "Error creating task.",
        });
    }
    return new Response(null, { status: 200, statusText: "Task created." });
}

export async function getClassesByIds(classIds: string[]) {
    if (!classIds) {
        return [];
    }
    const classes = await prisma.class.findMany({
        where: { id: { in: classIds } },
    });
    return classes;
}

export async function getClassesByUser(userId: string | null) {
    if (!userId) {
        return [];
    }
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!dbUser) {
        return [];
    }
    if (dbUser.role === "teacher" || dbUser.role === "admin") {
        const classes = await prisma.class.findMany({
            where: { teacherId: userId },
        });
        return classes;
    }
    const classes = await prisma.class.findMany({
        where: { students: { some: { id: userId } } },
    });
    return classes;
}

export async function initializePoints(userId: string, classId: string) {
    const points = await prisma.points.create({
        data: {
            userId: userId,
            classId: classId,
        },
    });
    if (!points) {
        return new Response(null, {
            status: 500,
            statusText: "Error initializing points.",
        });
    }
    return new Response(null, {
        status: 200,
        statusText: "Points initialized.",
    });
}

export async function checkForPoints(classStudents: User[], classId: string) {
    for (const student of classStudents) {
        const points = await prisma.points.findFirst({
            where: { userId: student.id, classId: classId },
        });
        if (!points) {
            await initializePoints(student.id, classId);
        }
    }
}

export async function getAllPointsUser(userId: string) {
    const dbUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!dbUser) {
        return [];
    }
    const points = await prisma.points.findMany({ where: { userId: userId } });
    return points;
}

export async function getAllPointsClass(classId: string) {
    const points = await prisma.points.findMany({
        where: { classId: classId },
    });
    return points.map((point) => point.points).reduce((a, b) => a + b, 0);
}

export async function inviteExists(inviteId: string | null) {
    if (!inviteId) return false;
    const invite = await prisma.invite.findUnique({ where: { id: inviteId } });
    return invite ? true : false;
}

export async function addPoints(
    classId: string,
    userId: string,
    points: number,
) {
    const current = await prisma.points.findFirst({
        where: { userId: userId, classId: classId },
    });
    if (!current) {
        return new Response(null, {
            status: 404,
            statusText: "No points found.",
        });
    }
    const updated = await prisma.points.update({
        where: { id: current.id },
        data: { points: points + current.points },
    });
    if (!updated) {
        return new Response(null, {
            status: 500,
            statusText: "Error updating points.",
        });
    }
    return new Response(null, {
        status: 200,
        statusText: "Points added. New points: " + updated.points,
    });
}

export async function getSchools() {
    const schools = await prisma.school.findMany();
    return schools;
}

export async function createSchool(name: string) {
    const school = await prisma.school.create({ data: { name: name } });
    return school;
}
export async function addUserToSchool(
    schoolId: number,
    userId: string,
    role: string,
) {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { Teacher: true },
    });
    if (!dbUser) {
        return null;
    }
    if (dbUser.role === "student") {
        const res = await prisma.school.update({
            where: { id: schoolId },
            data: { students: { connect: { id: userId } } },
        });
        return res;
    }
    if (dbUser.role === "teacher" && dbUser.Teacher) {
        const res = await prisma.school.update({
            where: { id: schoolId },
            data: { Teachers: { connect: { id: dbUser.Teacher.id } } },
        });
        return res;
    }
    return null;
}

export async function getBanner() {
    const banners = await prisma.banner.findMany();
    return banners.sort((a, b) => b.id - a.id)[0];
}

export async function getUserByIdWithClasses(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { Classes: true },
    });
    return user;
}

export async function getTasksforStudent(userId: string, classes: Class[]) {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
        include: { Classes: true },
    });
    if (!dbUser) {
        return [];
    }
    const tasks = await prisma.task.findMany({
        where: { classId: { in: dbUser.Classes.map((c) => c.id) } },
        orderBy: { dueDate: "desc" },
    });
    return tasks;
}
export async function getTimeline(
    classId: string,
    offset: number,
    filter?: "task" | "announcement",
) {
    if (!filter) {
        const tasks = await prisma.task.findMany({
            where: { classId: classId },
            orderBy: { dueDate: "desc" },
        });
        const announcements = await prisma.announcement.findMany({
            where: { classId: classId },
            orderBy: { createdAt: "desc" },
        });
        return [...announcements, ...tasks]
            .sort((a, b) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            })
            .slice(offset, offset + 10)
            .map((item) => {
                return {
                    ...item,
                    type: "dueDate" in item ? "task" : "announcement",
                };
            });
    }
    if (filter === "announcement") {
        const tasks = (
            await prisma.announcement.findMany({
                where: { classId: classId },
                orderBy: { createdAt: "desc" },
                skip: offset,
                take: 10,
            })
        ).map((a) => {
            return {
                ...a,
                type: "announcement",
            };
        });
        return tasks;
    }
    if (filter === "task") {
        const tasks = (
            await prisma.task.findMany({
                where: { classId: classId },
                orderBy: { createdAt: "desc" },
                skip: offset,
                take: 10,
            })
        ).map((t) => {
            return {
                ...t,
                type: "task",
            };
        });
        return tasks;
    }
    return [];
}

export async function getSubmissionsForStudent(userId: string) {
    const submissions = await prisma.user.findUnique({
        where: { id: userId },
        include: { Submission: true },
    });
    return submissions?.Submission;
}

export async function getSubmissionsForClass(classId: string) {
    const submissions = await prisma.submission.findMany({
        where: { Task: { classId: classId } },
        include: { User: true, essay: true, Task: true },
    });
    return submissions;
}

export async function getTimelineLengths(classId: string) {
    const tasks = await prisma.task.count({ where: { classId: classId } });
    const announcements = await prisma.announcement.count({
        where: { classId: classId },
    });
    return { tasks, announcements };
}

export async function getSchoolById(schoolId: number | null) {
    if (!schoolId) {
        return null;
    }
    const school = await prisma.school.findUnique({ where: { id: schoolId } });
    return school;
}

export async function changePrivacyById(userId: string, updated: boolean) {
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { private: updated },
    });
    if (!updatedUser) {
        return false;
    }
    return true;
}

export async function getAllTeachers() {
    const teachers = await prisma.teacher.findMany();
    return teachers;
}

export async function submitEssayToTask(taskId: number, essayId: string) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
        return "The task you are trying to submit to does not exist.";
    }
    const essay = await prisma.essay.findUnique({ where: { id: essayId } });
    if (!essay) {
        return "The essay you are trying to submit does not exist.";
    }
    const submission = await prisma.submission.findFirst({
        where: { taskId: taskId },
    });
    if (submission) {
        return "You have already submitted to this task.";
    }
    const submitted = await prisma.submission.create({
        data: { taskId: taskId, essayId: essayId, userId: essay.userId },
    });
    if (!submitted) {
        return "Error submitting essay. Contact support.";
    }
    return "Essay submitted successfully.";
}
