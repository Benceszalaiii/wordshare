"use server";

import { StatusMethods } from "@/components/task/studentoverview/component";
import { auth } from "@/lib/auth";
import { getClassWithTasks, getSubmissionsForStudent } from "@/lib/db";

export async function getTasksForClass(
    id: string,
    method: "teacher" | "student",
) {
    const currentClass = await getClassWithTasks(id);
    const session = await auth();
    if (!session) {
        return [];
    }
    if (method === "student") {
        const userSubmissions =
            (await getSubmissionsForStudent(session?.user.id)) || [];
        const filtered = currentClass?.Tasks.map((task) => {
            const submission = userSubmissions.find(
                (sub) => sub.taskId === task.id,
            );
            let taskStatus: StatusMethods = "pending";
            if (submission) {
                if (submission.createdAt > task.dueDate) {
                    taskStatus = "late";
                } else {
                    taskStatus = "done";
                }
            } else {
                if (task.dueDate > new Date()) {
                    taskStatus = "pending";
                } else {
                    taskStatus = "overdue";
                }
            }
        });
    }
}
