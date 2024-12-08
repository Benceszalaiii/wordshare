
import { getRandomTopic } from "@/lib/gemini";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic"
export async function GET(req: NextRequest){
    const res = await getRandomTopic(Math.random() > 0.5 ? "B2" : "C1");
    return new Response(res.response.text(), {status: 200});
}