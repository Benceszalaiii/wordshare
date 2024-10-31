import { Button } from "../ui/button";
import {
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
    Dialog,
    DialogDescription,
} from "../ui/dialog";
import { TaskProp } from "./timeline";
import { differenceInDays } from "date-fns";

export function TaskViewModal({ task }: { task: TaskProp }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="text-end">
                <Button>Go to task</Button>
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
