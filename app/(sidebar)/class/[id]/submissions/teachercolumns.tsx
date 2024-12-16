"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { SubmissionProps } from "./page";
import { capitalize } from "@/lib/utils";



export const columns: ColumnDef<SubmissionProps>[] = [
    {
        accessorKey: "Task",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Task
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Link href={`/class/${row.original.Task.classId}/task/${row.original.taskId}`} className="flex items-center">
                    <span>{row.original.Task.title}</span>
                </Link>
            );
        }
    },
    {
        accessorKey: "User",
        header: "User",
        cell: ({ row }) => {
            return (
                <Link href={`/user/${row.original.userId}`} className="flex items-center">
                    <span>{row.original.User.name}</span>
                </Link>
            );
        }
    },
    {
      accessorKey: "essay",
      header: "Essay",
      cell: ({ row }) => {
          return (
              <Link href={`/essay/view/${row.original.essayId}`} className="flex items-center">
                  <span>{row.original.essay.title}</span>
              </Link>
          );
      }
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const submission = row.original;
        const task = row.original.Task;
        let taskStatus
        if (submission) {if (submission.createdAt > task.dueDate) {return "late";
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
          return (
              <span>{capitalize(taskStatus)}</span>
          );
      }
    }
];
