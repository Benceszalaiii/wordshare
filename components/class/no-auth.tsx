import { Class } from "@prisma/client";
import ClassLegend from './legend';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SignInButton } from "../shared/buttons";

export default async function NoAuthClassPage({currentClass}: {currentClass: Class}){
    const session = await getServerSession(authOptions);
    return (
        <>
        <ClassLegend canEdit={false} currentClass={currentClass} isAnon session={session || undefined} />
        </>
    )
}