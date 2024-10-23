import { getEssayById } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest){
    const fetched = await getEssayById("cm2lupoxe0001lya4hm8mfexr");
    if (!fetched){
        return new Response("Essay cannot be retrieved.", { status: 404 });
    }
    return new Response(JSON.stringify(await fetched.json()), { status: 200 });
}