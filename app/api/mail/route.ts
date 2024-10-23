import { sendEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { getUserById } from "@/lib/db";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session){
        return new Response("Unauthorized", { status: 401 });
    }
    const dbUser = await getUserById(session.user.id);
    if (!dbUser || !(dbUser.role === "admin" || dbUser.role === "teacher")){
        return new Response("Unauthorized", { status: 401 });
    }
    const mailTemplate = req.headers.get("mailTemplate")
    if (!mailTemplate){
        return new Response("No mail template provided", { status: 400 });
    }
    switch(mailTemplate){
        case "taskSubmit": {
            // SEND EMAIL TO TEACHER ABOUT SUBMISSION
        }
        case "taskCreate": {
            // SEND EMAIL TO STUDENTS OF TASK ABOUT NEW TASK
        }
        case "taskGrade": {
            // SEND EMAIL TO STUDENT ABOUT GRADING
        }
        case "taskComment": {
            // SEND EMAIL TO STUDENT ABOUT COMMENT
        }
    }
    return new Response("Admin or teacher detected");
    const res = await sendEmail({
        Source: "no-reply@wordshare.tech",
        Destination: {
            ToAddresses: ["szalaibence0817@gmail.com"],
        },
        Message: {
            Subject: {
                Data: "Test email",
            },
            Body: {
                Text: {
                    Data: "Hello World",
                },
            },
        },
    });
    return new Response(JSON.stringify(res), { status: res.httpStatusCode });
}
