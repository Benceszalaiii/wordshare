import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const currentEvent = process.env.EVENT || null;
    return new Response(null, {status: currentEvent ? 200 : 204, statusText: currentEvent || "Inactive"});
}