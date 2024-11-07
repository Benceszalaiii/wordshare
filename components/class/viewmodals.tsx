import { differenceInDays } from "date-fns";
import { TaskWithProps } from "../task/studentoverview/component";
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
    return (
        <Dialog>
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
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
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
