import { NextRequest } from "next/server";
import { getEssays } from "@/lib/db";
export async function GET(req: NextRequest){
    const userId = "cm1kk1pot0000auawf0g2nbfu";
    const essays = await getEssays(userId);
    return Response.json({essays: essays});
}