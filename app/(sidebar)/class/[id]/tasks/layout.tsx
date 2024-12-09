"use server";

import { getUser } from "@/lib/db";

export default async function Layout({student, teacher, children}: {student: React.ReactNode, teacher: React.ReactNode, children: React.ReactNode}){
    const dbUser = await getUser();
    if (!dbUser?.role){
        return (
            <div>
                <h1>Task Layout</h1>
                You need to be either a student or a teacher to view this page.
            </div>
        )
    }
    return (
        <div>
            <h1>Task Layout</h1>
            {dbUser.role === "teacher" || dbUser.role === "admin" ? teacher : student}
        </div>
    )
}