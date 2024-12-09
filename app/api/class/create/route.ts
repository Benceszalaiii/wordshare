import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    return new Response("This API endpoint is outdated. Migrated to Next.js Server Actions.", { status: 404 });
}
