import { auth } from "@/lib/auth";
import { sendTemplate } from "@/lib/aws";
import { getUserById } from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session) {
        return new Response("No session found", { status: 401 });
    }
    const dbUser = await getUserById(session?.user?.id);
    if (!dbUser) {
        return new Response("User not found in database", { status: 401 });
    }
    if (dbUser.role !== "teacher" && dbUser.role !== "admin") {
        return new Response(
            "User doesnt have necessary roles for this action.",
            { status: 403 },
        );
    }
    const { to, sender, class_name, action_url, receiver_name } =
        await req.json();
    if (!to || !sender || !action_url || !receiver_name) {
        return new Response("Missing required fields", { status: 400 });
    }
    if (!class_name) {
        return new Response("Missing class name", { status: 400 });
    }
    const res = await sendTemplate({
        Source: '"WordShare"<invite@wordshare.tech>',
        Destination: { ToAddresses: to },
        Template: "class-invite",
        TemplateData: JSON.stringify({
            action_url: action_url,
            invite_sender_name: sender.name,
            name: receiver_name,
            invite_sender_email: sender.email,
            support_email: "szalaibence0817@gmail.com",
            class_name: class_name,
        }),
    });
    return new Response("Sent data to server", {
        status: res.$metadata.httpStatusCode || 500,
    });
}
