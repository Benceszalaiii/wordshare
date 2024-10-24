import { NextRequest } from "next/server";
import { deleteTemplate, sendTemplate, uploadTemplate } from "@/lib/email";

export async function GET(req: NextRequest){
    const res = await sendTemplate({
        Source: '"WordShare"<no-reply@wordshare.tech>',
        Destination: {ToAddresses: ["szalaibence0817@gmail.com"]},
        Template: "class-invite",
        TemplateData: JSON.stringify({"action_url": "https://wordshare.tech/class/create", "invite_sender_name": "Bence", "name": "Bird", "class_name": "11C Kraken", })
    });
    // const res = await deleteTemplate();
    // const res2 = await uploadTemplate();
    return new Response(JSON.stringify(res), {status: 200});
}