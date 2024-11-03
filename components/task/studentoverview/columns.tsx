import { ColumnDef } from "@tanstack/react-table";
import { TaskWithProps } from "./component";
import { capitalize, dateToLocalTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TaskViewModal } from "@/components/class/viewmodals";
import { ArrowUpDown } from "lucide-react";
export const columns: ColumnDef<TaskWithProps>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            return <span className="line-clamp-1 w-48">{row.original.title}</span>;
        },
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="text-right"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Due Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        sortingFn: (a, b) => {
            return a.original.dueDate.getTime() - b.original.dueDate.getTime();
        },
        cell: ({ row }) => {
            return (
                <span className="text-right">
                    {dateToLocalTime(row.original.dueDate).toLocaleDateString()}
                </span>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return <span>{capitalize(row.original.status)}</span>;
        },
    },
    {
        accessorKey: "className",
        header: "Class",
        cell: ({ row }) => {
            return (
                <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                    <AvatarImage src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${row.original.classId}/icon`} />
                    <AvatarFallback>{row.original.className.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{row.original.className}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            return (
                <TaskViewModal trigger={(<Button variant={"linkHover2"}>View</Button>)} task={row.original} />
            );
        },
    },
];
