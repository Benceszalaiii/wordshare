import { auth } from "@/lib/auth";
import { deletePoints, getUserById, isOwnClass, leaveClass } from "@/lib/db";
import { NextRequest } from "next/server";

type Params = Promise<{ classId: string }>;

export async function POST(
    req: NextRequest,
    { params }: { params: Params },
) {
    const  { classId } = await params;
    const session = await auth();
    if (!session) {
        return new Response(
            "You need to be signed in to access this endpoint.",
            { status: 401 },
        );
    }
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return new Response(
            "You need to be signed in to access this endpoint.",
            { status: 401 },
        );
    }
    const res = await leaveClass(classId, session?.user?.id);
    if (!res.ok) {
        return new Response(
            "Failed to leave class. It is possible that the mistake is on our side.",
            { status: 500 },
        );
    }
    return new Response("Left class", { status: 200 });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId } = await params;
    const session = await auth();
    if (!session) {
        return new Response(
            "You need to be signed in to access this endpoint.",
            { status: 401 },
        );
    }
    const userId = req.headers.get("userId");
    if (!userId) {
        return new Response("No userId present in request.", { status: 400 });
    }
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return new Response(
            "You need to be signed in to access this endpoint.",
            { status: 401 },
        );
    }
    const hasRights =
        (await isOwnClass(session?.user?.id, classId)) ||
        dbUser.role === "admin";
    if (!hasRights) {
        return new Response("You do not have elevated access to this class.", {
            status: 401,
        });
    }
    const res = await leaveClass(classId, userId);
    const res2 = await deletePoints(userId, classId);
    if (!res.ok) {
        return new Response(
            "Failed to kick from class. It is possible that the mistake is on our side.",
            { status: 500 },
        );
    }
    return new Response("Kicked from class", { status: 200 });
}
