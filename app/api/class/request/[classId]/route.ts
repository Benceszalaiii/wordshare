import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { sendRequest } from "@/lib/aws";
import { getClassById, getUserById } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { classId: string } },
) {
    const session = await getServerSession(authOptions);
    const dbUser = await getUserById(session?.user.id);
    const currentClass = await getClassById(params.classId);
    const teacher = await getUserById(currentClass?.teacherUserId);
    if (!dbUser) {
        return new Response("Log in first", { status: 401 });
    }
    if (dbUser.role !== "student") {
        return new Response(
            "You are not a student, make sure you set up your account correctly",
            { status: 401 },
        );
    }
    if (!currentClass) {
        return new Response("Class not found", { status: 404 });
    }
    if (!teacher) {
        return new Response("Teacher not found", { status: 404 });
    }
    if (!teacher.email) {
        return new Response(
            "Teacher has no email, cannot notify them. Make sure to contact them directly.",
            { status: 404 },
        );
    }
    if (!dbUser.name || !dbUser.email) {
        return new Response(
            "You have no name or email provided, make sure you set up your account correctly",
            { status: 401 },
        );
    }
    const res = await sendRequest({
        action_url: `https://www.wordshare.tech/class/${
            params.classId
        }/invite?q=${dbUser.name.replaceAll(" ", "%20")}`,
        class_name: currentClass.name,
        name: teacher.name || `Teacher of ${currentClass.name}`,
        requester_mail: dbUser.email,
        requester_name: dbUser.name,
        to: [teacher.email || "szalaibence0817@gmail.com"],
    });
}
