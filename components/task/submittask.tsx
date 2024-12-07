"use client";

import { getEssays, isTaskSubmitted, submitEssay } from "@/app/(sidebar)/class/[id]/actions";
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
import { toast } from "sonner";

export default function SubmitTaskModal({
    children,
    taskId,
    parentOpenAction
}: {
    children: React.ReactNode;
    taskId: number;
    parentOpenAction?: (open: boolean) => void;
}) {
    const [filteredEssays, SetFilteredEssays] = useState<Essay[]>([]);
    const [fetching, setFetching] = useState(true);
    const [essays, setEssays] = useState<Essay[]>([]);
    const [filter, setFilter] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [open , setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [alreadySubmitted, setAlreadySubmitted] = useState(false);
    useEffect(() => {
        isTaskSubmitted(taskId).then((data) => {
            setAlreadySubmitted(data);
        });
        getEssays().then((data) => {
            setEssays(data);
            setFetching(false);
        }).finally(()=> {
            setLoading(false);
        });
    }, []);
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
    if (alreadySubmitted) {
        return (
            <Button variant={"correct"} disabled>Submitted</Button>
        )
    }
    if (loading){
        return (
            <Button variant={"outline"} disabled>Loading...</Button>
        )
    }
    return (
        <Dialog onOpenChange={setOpen} open={open}>
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
                    <div className="flex w-full flex-col gap-2">
                        {filteredEssays && filteredEssays.length > 0 ? (
                            <>
                                {filteredEssays.map((t) => (
                                    <div
                                        key={t.id}
                                        className={
                                            "flex flex-row items-center justify-between rounded-md border p-2 md:px-12"
                                        }
                                    >
                                        <p className="line-clamp-2 leading-normal">
                                            {t.title}
                                        </p>
                                        <Button
                                        disabled={submitted}
                                            variant={"linkHover1"}
                                            onClick={() => {
                                                setSubmitted(true);
                                                submitEssay(taskId, t.id).then(
                                                    (data) => {
                                                        toast.info(data);
                                                        setOpen(false);
                                                        parentOpenAction && parentOpenAction(false);
                                                    },
                                                );
                                            }}
                                        >
                                            Select
                                        </Button>
                                    </div>
                                ))}
                                <div className="mt-4 flex items-center justify-center">
                                    <Link href={`/essay/write`}>
                                        <Button variant={"ringHover"}>
                                            or Create Essay
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        ) : fetching ? (
                            <p>Loading essays...</p>
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
