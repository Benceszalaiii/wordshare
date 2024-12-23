import { auth } from "@/lib/auth";
import { sendRequest } from "@/lib/aws";
import { getClassById, getUserById } from "@/lib/db";
import { NextRequest } from "next/server";

type Params = Promise<{ classId: string }>;

export async function POST(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId } = await params;
    const session = await auth();
    const dbUser = await getUserById(session?.user?.id);
    const currentClass = await getClassById(classId);
    const teacher = await getUserById(currentClass?.teacherId);
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
            classId
        }/invite?q=${dbUser.name.replaceAll(" ", "%20")}`,
        class_name: currentClass.name,
        name: teacher.name || `Teacher of ${currentClass.name}`,
        requester_mail: dbUser.email,
        requester_name: dbUser.name,
        to: [teacher.email || "szalaibence0817@gmail.com"],
    });
}
