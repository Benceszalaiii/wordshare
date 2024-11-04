"use client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { DataTable } from "./studentoverview/data-table";
import { columns } from "./studentoverview/columns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TaskWithProps } from "./studentoverview/component";
import { Button } from "../ui/button";
import { Essay } from "@prisma/client";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";

export default function SubmitTaskModal({
    children,
    essays,
    classId,
}: {
    children: React.ReactNode;
    essays: Essay[];
    classId: string;
}) {
    const [filteredEssays, SetFilteredEssays] = useState<Essay[]>(essays);
    const [filter, setFilter] = useState("");
    useEffect(() => {
        if (filter) {
            SetFilteredEssays(
                essays.filter((t) =>
                    t.title.toLowerCase().includes(filter.toLowerCase()),
                ),
            );
        } else {
            SetFilteredEssays(essays);
        }
    }, [filter, essays]);

    const className = "grow w-full";
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Submit Task</DialogTitle>
                    <DialogDescription>
                        Attach an essay to submit task.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    type="text"
                    placeholder="Search essays..."
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value || "");
                    }}
                />
                <ScrollArea className="h-72 w-full">
                    <div className="grid w-full grid-cols-2 place-content-center gap-4">
                        {filteredEssays && filteredEssays.length > 0 ? (
                            <>
                                {filteredEssays.map((t) => (
                                    <Card key={t.id} className={className}>
                                        <CardHeader>
                                            <CardTitle>{t.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="line-clamp-2">
                                                {t.content}
                                            </p>
                                        </CardContent>
                                        <CardFooter>
                                            <Button variant={"shine"}>
                                                Select
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                                <Card className="flex items-center justify-center">
                                    <Link href={`/essay/write`}>
                                    <Button variant={"ringHover"} >
                                    or Create essay
                                    </Button>
                                    </Link>
                                </Card>
                            </>
                        ) : (
                            <p>No essays</p>
                        )}
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <DialogClose>Close</DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
