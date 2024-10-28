import { deleteTemplate, uploadTemplate } from "@/lib/aws";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET(){
    const session = await getServerSession(authOptions);
    if (session?.user.email !== "szbence2007@gmail.com"){
        return new Response("Unauthorized", {status: 401});
    }
    const res2 = await deleteTemplate();
    const res1 = await uploadTemplate();
    if (res1 && res2){
        return new Response("Template uploaded and deleted", {status: 200});
    }
    return new Response("Template upload failed", {status: 500});
}