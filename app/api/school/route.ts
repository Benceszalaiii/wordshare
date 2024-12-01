import { auth } from "@/lib/auth";
import {
    addUserToSchool,
    createSchool,
    getSchools,
    getUserById,
} from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    const schools = await getSchools();
    return new Response(JSON.stringify(schools), { status: 200 });
}

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    const params = await req.json();
    if (!params.name) {
        return new Response("School name is required", { status: 400 });
    }
    const school = await createSchool(params.name);
    return new Response(JSON.stringify(school), { status: 201 });
}

export async function PUT(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const dbUser = await getUserById(session.user.id);
    if (!dbUser) {
        return new Response("Unauthorized", { status: 401 });
    }
    const school = await addUserToSchool(
        body.schoolId,
        dbUser.id,
        dbUser.role || "",
    );
    if (!school) {
        return new Response("User has inappropriate role set.", {
            status: 404,
        });
    }
    return new Response(null, { status: 201 });
}
