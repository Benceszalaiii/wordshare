import { auth } from "@/lib/auth";
import { getUserById, uploadTask } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: { classId: string } },
) {
    const { classId } = params;
    if (!classId) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }
    const session = await auth();
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return new Response(null, { status: 401, statusText: "Unauthorized" });
    }
    const body = await req.json();
    if (!body.title || !body.dueDate) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }
    const res = await uploadTask({
        classId: classId,
        title: body.title,
        dueDate: body.dueDate,
        content: body.content || "There is no description for this task",
    });
    return new Response(null, {
        status: res.status,
        statusText: res.statusText,
    });
}
