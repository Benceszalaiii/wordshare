"use server";

import { getClassById, getSubmissionsForClass, getUser } from "@/lib/db";
import { DataTable } from './data-table';
import { columns as TeacherColumns } from "./teachercolumns";
import { columns as StudentColumns } from "./studentcolumns";
import { Prisma } from "@prisma/client";
import { notAuthorized } from "@/components/auth";

type Params = {
    id: string;
};

export type SubmissionProps = Prisma.SubmissionGetPayload<{include: {Task: true, User: true, essay: true}}>


export default async function Page({ params }: { params: Promise<Params> }) {
    const currentClass = await getClassById((await params).id);
    const dbUser = await getUser();
    
    if (!dbUser) {
        return notAuthorized("submissions of this class");
    }
    if (!currentClass) {
        return <>Class not found</>;
    }
    if (dbUser.role === "admin" || dbUser.role === "teacher") {
        const data = await getSubmissionsForClass(currentClass.id);
        return (
            <>
                <h1>{currentClass?.name}</h1>
                <DataTable columns={TeacherColumns} data={data} />
            </>
        );
    }
    const data = await getSubmissionsForClass(currentClass.id);
    return (
        <>
            <h1>{currentClass?.name}</h1>
            <DataTable columns={StudentColumns} data={data} />
        </>
    );
}
