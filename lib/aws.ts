import templates from "./schemas.json";
import {
    SendEmailCommandInput,
    SendTemplatedEmailCommandInput,
    SES,
    SESClientConfig,
} from "@aws-sdk/client-ses";

const ses = new SES({
    region: "eu-central-1",
    credentials: {
        accessKeyId: process.env.AWS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET || "",
    },
});
export interface InviteMailDataProps {
    to: string[];
    sender: { email: string; name: string };
    class_name: string;
    action_url: string;
    receiver_name: string;
}


export interface EmailProps {
    from: string;
    to: string;
    subject: string;
    body: string;
}

export async function sendEmail(mailSettings: SendEmailCommandInput) {
    const res = await ses.sendEmail(mailSettings);
    return res.$metadata;
}

export async function sendTemplate(
    mailSettings: SendTemplatedEmailCommandInput,
) {
    const res = await ses.sendTemplatedEmail({
        Template: mailSettings.Template,
        Source: mailSettings.Source,
        Destination: mailSettings.Destination,
        TemplateData: mailSettings.TemplateData,
    });
    return res;
}

export async function sendInviteMail(params: InviteMailDataProps) {
    const mailSettings: SendTemplatedEmailCommandInput = {
        Source: `${params.sender.name} at WordShare<invites@wordshare.tech>`,
        Destination: {
            ToAddresses: params.to,
        },
        Template: "class-invite",
        TemplateData: JSON.stringify({
            name: params.receiver_name,
            invite_sender_name: params.sender.name,
            class_name: params.class_name,
            action_url: params.action_url,
            support_email: "contact@wordshare.tech",
            invite_sender_email: params.sender.email,
        }),
    };
    return await sendTemplate(mailSettings);
}

export async function uploadTemplate() {
    // helper function to upload template to SES
    const res = await ses.createTemplate({
        Template: {
            TemplateName: "class-invite",
            SubjectPart:
                "{{invite_sender_name}} invited you to {{class_name}}!",
            HtmlPart: templates.invite,
            TextPart:
                "You have been invited to join {{class_name}} by {{invite_sender_name}}. Click the link below to join the class: {{action_url}}",
        },
    });
    return res;
}

export async function deleteTemplate() {
    return await ses.deleteTemplate({ TemplateName: "class-invite" });
}
