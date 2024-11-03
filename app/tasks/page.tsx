import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { notAuthorized } from "@/components/auth";

export default async function Page(){
    const session = await getServerSession(authOptions);
    if (!session){
        return notAuthorized("Tasks");
    }
}