import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Class } from "@prisma/client";
import { getServerSession } from "next-auth";
import ClassLegend from "./legend";

export default async function NoAuthClassPage({
    currentClass,
    bannerUrl,
}: {
    currentClass: Class;
    bannerUrl: string;
}) {
    const session = await getServerSession(authOptions);
    return (
        <>
            <ClassLegend
                bannerUrl={bannerUrl}
                canEdit={false}
                currentClass={currentClass}
                isAnon
                session={session || undefined}
            />
        </>
    );
}
