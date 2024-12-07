"use client";
import { differenceInDays } from "date-fns";
import { useState } from "react";
import { TaskWithProps } from "../task/studentoverview/component";
import SubmitTaskModal from "../task/submittask";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { TaskProp } from "./timeline";

export function TaskViewModal({
    task,
    trigger,
}: {
    task: TaskProp | TaskWithProps;
    trigger?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="text-end">
                {trigger ? trigger : <Button>Go to task</Button>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task.title}</DialogTitle>
                    <DialogDescription>
                        In {differenceInDays(task.dueDate, new Date())} days
                    </DialogDescription>
                </DialogHeader>
                <DialogDescription>{task.content}</DialogDescription>
                <DialogFooter className="flex flex-col gap-4 md:flex-row">
                    <SubmitTaskModal
                        parentOpenAction={setOpen}
                        taskId={task.id}
                    >
                        <Button variant={"outline"}>Attach Essay</Button>
                    </SubmitTaskModal>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function AnnouncementViewModal({ announcement }: { announcement: any }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="text-end">
                <Button>View</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{announcement.title}</DialogTitle>
                    <DialogDescription>
                        {announcement.createdAt.toLocaleString()}
                    </DialogDescription>
                </DialogHeader>
                <DialogDescription>{announcement.content}</DialogDescription>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
