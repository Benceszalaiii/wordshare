import { addTeacher, changeRoleById } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest){
    const body = await req.json();
    const method = body.decision;
    const secret = body.secret;
    if (secret !== "baddadan"){
        return new Response(null, { status: 401, statusText: "Invalid secret"});
    }
    if (!method){
        return new Response(null, { status: 400, statusText: "No decision provided"});
    }
    const userId = body.userId;
    if (!userId){
        return new Response(null, { status: 400, statusText: "No userId provided"});
    }
    if (method === "accept"){
        const response = await addTeacher(userId);
        return new Response(null, { status: response.status, statusText: response.statusText });
    }
    else if (method === "reject"){
        const response = await changeRoleById(userId, "student")
        return new Response(null, { status: response.status, statusText: response.statusText });
    }
    return new Response(null, { status: 400, statusText: "Invalid decision"});
}