"use client";
import { Class, Task } from "@prisma/client";
import { columns } from "./columns";
import { DataTable } from "./data-table";
export type StatusMethods = "done" | "pending" | "overdue" | "late";
export type TaskWithProps = Task & { status: StatusMethods; className: string };
export default function StudentTaskTable({
    userClasses,
    filteredTask,
}: {
    userClasses: Class[];
    filteredTask: TaskWithProps[];
}) {
    return (
        <article>
            <DataTable
                columns={columns}
                data={filteredTask}
                userClasses={userClasses}
            />
        </article>
    );
}
