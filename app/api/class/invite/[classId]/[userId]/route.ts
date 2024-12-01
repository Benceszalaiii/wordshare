import { auth } from "@/lib/auth";
import {
    acceptInvite,
    deleteInvite,
    getClassById,
    getUserById,
    initializePoints,
    inviteUser,
    isOwnClass,
} from "@/lib/db";
import { NextRequest } from "next/server";

type Params = Promise<{ classId: string; userId: string }>;

export async function POST(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId, userId } = await params;
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
    const elevated =
        (await isOwnClass(session?.user?.id, classId)) ||
        dbUser.role === "admin";
    if (!elevated) {
        return new Response("You do not have elevated access to this class.", {
            status: 401,
        });
    }
    const invite = await inviteUser(
        classId,
        userId,
        session?.user?.id,
    );
    if (!invite.ok) {
        return new Response(
            "Failed to invite user. It is possible that the mistake is on our side.",
            { status: 500 },
        );
    }
    const points = await initializePoints(userId, classId);
    return new Response(invite.statusText, { status: invite.status });
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId, userId } = await params;
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
    const owninvite = session?.user?.id === (userId || "bimbam");
    if (!owninvite) {
        return new Response(
            "You are trying to decline an invite that is not yours.",
            { status: 401 },
        );
    }
    const inviteId = req.headers.get("inviteId");
    if (!inviteId) {
        return new Response("No inviteId present in request.", { status: 400 });
    }
    const res = await deleteInvite(inviteId);
    if (!res.ok) {
        return new Response(
            "Failed to decline invite. It is possible that the mistake is on our side.",
            { status: 500 },
        );
    }
    return new Response("Invite declined", { status: 200 });
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId, userId } = await params;
    const session = await auth();
    const inviteId = req.headers.get("inviteId");
    if (!inviteId) {
        return new Response("No inviteId present in request.", { status: 400 });
    }
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
    const owninvite = session?.user?.id === (userId || "bimbam");
    if (!owninvite) {
        return new Response(
            "You are trying to accept an invite that is not yours. Perhabs you are not signed in to the correct account?",
            { status: 401 },
        );
    }
    const dbuser = await getUserById(userId);
    const currentClass = await getClassById(classId);
    if (!dbuser || !currentClass) {
        return new Response("Invite parameters not present in database.", {
            status: 404,
        });
    }
    const invite = await acceptInvite(currentClass.id, dbuser);
    if (!invite.ok) {
        return new Response(
            "Failed to accept invite. It is possible that the mistake is on our side.",
            { status: 500 },
        );
    }
    const deleted = await deleteInvite(inviteId);
    return new Response("Invite accepted", { status: 200 });
}
