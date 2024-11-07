import { createClass, getTeacher, getUserById } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function POST(req: NextRequest) {
    const classLang = req.headers.get("class-lang");
    const className = req.headers.get("class-name");
    const classDesc = req.headers.get("class-desc");
    // return new Response("Sorry, we dont accept any more classes, baddadan", { status: 403, statusText: "Sorry, we dont accept any more classes" });
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("You need to be signed in to access this page.", {
            status: 401,
            statusText: "Unauthorized",
        });
    }
    if (!session.user.id) {
        return new Response("You need to be signed in to access this page.", {
            status: 401,
            statusText: "Unauthorized",
        });
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser) {
        return new Response("You need to be signed in to access this page.", {
            status: 401,
            statusText: "Unauthorized",
        });
    }
    const teacher = await getTeacher(dbUser.id);
    if (!(teacher || dbUser.role === "admin")) {
        return new Response("You need to be a teacher to access this page.", {
            status: 403,
            statusText: "Forbidden",
        });
    }
    if (!classLang || !className) {
        return new Response("Please fill in all the fields.", {
            status: 400,
            statusText: "Bad Request",
        });
    }
    const fetched = await createClass({
        language: classLang,
        classname: className,
        description: classDesc || "",
    });
    if (!fetched) {
        return new Response("Error creating class.", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
    return new Response(`${fetched.statusText}`, {
        status: 200,
        statusText: "OK",
    });
}
