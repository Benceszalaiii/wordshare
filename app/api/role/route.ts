import { NextRequest } from "next/server";
import { changeRoleById } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
export async function GET(req: NextRequest){
    const role = req.nextUrl.searchParams.get("role")?.toLowerCase() || null;
    const auth = await getServerSession(authOptions);
    if (!auth){
        return new Response(null, { status: 401, statusText: "No user found"});
    }
    const user = auth.user;
    const res = await changeRoleById(user.id, role);
    if( res.status !== 200 ){
        return new Response(null, { status: res.status, statusText: res.statusText });
    }
    if (!role){
        return new Response(null, { status: 200, statusText: "Role cleared" });
    }
    return new Response(null, { status: 200, statusText: `Role set to ${role}` });
}