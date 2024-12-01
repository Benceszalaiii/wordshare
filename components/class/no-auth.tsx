import { auth } from "@/lib/auth";
import { Class } from "@prisma/client";
import ClassLegend from "./legend";
export default async function NoAuthClassPage({
    currentClass,
    bannerUrl,
}: {
    currentClass: Class;
    bannerUrl: string;
}) {
    const session = await auth();
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
