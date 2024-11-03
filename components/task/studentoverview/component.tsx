"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { dateToLocalTime } from "@/lib/utils";
import { Class, Submission, Task } from "@prisma/client";
import { Button } from "../../ui/button";
import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import LoaderSpinner from "@/components/loader/spinner";
import LoaderDots from "@/components/loader/dots";
export type StatusMethods = "done" | "pending" | "overdue" | "late";
export type TaskWithProps = Task & { status: StatusMethods; className: string };
export default function StudentTaskTable({
    userClasses,
    filteredTask
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
