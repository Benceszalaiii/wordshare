import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.pathname.replace("/api/redirect", "");
    if (!params) {
        return redirect("/");
    }
    return redirect(params);
}
