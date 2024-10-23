import AWS from "aws-sdk";

import { SendEmailCommandInput, SES, SESClientConfig } from "@aws-sdk/client-ses";


const ses = new SES({
    region: "eu-central-1",
    credentials: {
        accessKeyId: process.env.AWS_KEY || "",
        secretAccessKey: process.env.AWS_SECRET || "",
    },
});

export interface EmailProps{
    from: string;
    to: string;
    subject: string;
    body: string;
}

export async function sendEmail(mailSettings: SendEmailCommandInput){
    const res = await ses.sendEmail(mailSettings);
    return res.$metadata;
}