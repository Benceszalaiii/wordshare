"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Essay } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-screen-md">
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
                    <div className="grid w-full grid-cols-1 place-content-center gap-4 sm:grid-cols-2">
                        {filteredEssays && filteredEssays.length > 0 ? (
                            <>
                                {filteredEssays.map((t) => (
                                    <Card
                                        key={t.id}
                                        className={"flex h-64 flex-col"}
                                    >
                                        <CardHeader>
                                            <CardTitle className="line-clamp-2 leading-normal">
                                                {t.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardFooter className="mt-auto self-end">
                                            <Button variant={"gooeyLeft"}>
                                                Select
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                                <Card className="flex h-64 items-center justify-center">
                                    <Link href={`/essay/write`}>
                                        <Button variant={"ringHover"}>
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
