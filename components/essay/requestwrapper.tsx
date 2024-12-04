"use server";

import { auth } from "@/lib/auth";
import { getAllTeachers } from "@/lib/db";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";

export default async function RequestWrapper({
    essayId,
    children,
}: {
    children: React.ReactNode;
    essayId: string;
}) {
    const session = await auth();
    const teachers = await getAllTeachers();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Request Review</DialogTitle>
                {/* {teachers.map((teacher) => (
                    <DialogDescription key={teacher.id}>
                        {teacher.user.name}
                    </DialogDescription>
                ))} */}
                <DialogDescription>
                Not yet implemented. Please check back later.
                </DialogDescription>

            </DialogContent>
        </Dialog>
    );
}
