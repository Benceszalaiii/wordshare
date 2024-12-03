"use server";

import { notAuthorized } from "@/components/auth";
import { auth } from "@/lib/auth";
import StudentTaskTable from "@/components/task/studentoverview/component";
import { getFilteredTasks } from "./actions";
export default async function Page() {
    const session = await auth();
    if (!session) {
        return notAuthorized("Tasks");
    }
    const data = await getFilteredTasks(session.user.id);
    if (!data) {
        return notAuthorized("Tasks");
    }
    if (data.userRole !== "student") {
        return (
            <section className="px-4 md:px-32">
                <h1 className="text-2xl font-bold">Tasks</h1>
                <p>Only students can view this page at the moment</p>
            </section>
        );
    }

    return (
        <section className="px-4 md:px-32">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <StudentTaskTable
                filteredTask={data.filteredTasks}
                userClasses={data.userClasses}
            />
        </section>
    );
}
