import { auth } from "@/lib/auth";
import { AnnounceClass, getUserById, isOwnClass } from "@/lib/db";
import { NextRequest } from "next/server";


type Params = Promise<{ classId: string }>;
export async function POST(
    req: NextRequest,
    { params }: { params: Params },
) {
    const { classId } = await params;
    if (!classId) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }
    const session = await auth();
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return new Response(null, { status: 401, statusText: "Unauthorized" });
    }
    const hasrights = await isOwnClass(dbUser.id, classId);
    if (!hasrights && dbUser.role !== "admin") {
        return new Response(null, { status: 403, statusText: "Forbidden" });
    }
    const body = await req.json();
    if (!body.title || !body.content) {
        return new Response(null, { status: 400, statusText: "Bad Request" });
    }
    const res = await AnnounceClass({
        classId: classId,
        title: body.title,
        content: body.content,
    });
    return new Response(JSON.stringify(res.statusText), { status: res.status });
}
