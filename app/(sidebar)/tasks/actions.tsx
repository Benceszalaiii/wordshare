"use server";

import { auth } from "@/lib/auth";
import {
    getEssaysByUserId,
    getSubmissionsForStudent,
    getTasksforStudent,
    getUserByIdWithClasses,
} from "@/lib/db";
import { Class, Task } from "@prisma/client";
type StatusMethods = "done" | "pending" | "overdue" | "late";
type TaskWithProps = Task & { status: StatusMethods; className: string };

type TaskResponse = {
    userClasses: Class[];
    filteredTasks: TaskWithProps[];
    userRole: string;
};

export async function getFilteredTasks(userId: string) {
    const dbUser = await getUserByIdWithClasses(userId);
    if (!dbUser) {
        return null;
    }
    const tasks = await getTasksforStudent(dbUser.id, dbUser.Classes);
    const userSubmissions = await getSubmissionsForStudent(dbUser.id);
    const filtered = tasks.map((task) => {
        const submission = userSubmissions?.Submission.find((x)=> x.taskId === task.id)
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
        const classObj = dbUser.Classes.find((cls) => cls.id === task.classId);
        if (classObj) {
            return {
                ...task,
                status: taskStatus,
                className: classObj.name,
            };
        }
        return { ...task, status: taskStatus, className: "-" };
    });
    const res: TaskResponse = {
        userClasses: dbUser.Classes,
        filteredTasks: filtered,
        userRole: dbUser.role || "invalid",
    };
    return res;
}

export async function getEssaysForUser() {
    const session = await auth();
    if (!session) {
        return [];
    }
    const essays = await getEssaysByUserId(session.user.id);
    return essays;
}
