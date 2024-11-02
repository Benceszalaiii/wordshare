"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { School } from "@prisma/client";

import { ComboSearch } from "../combosearch";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function StudentModal({ schools }: { schools: School[] }) {
    const schoolValues = schools.map((school) => ({
        value: school.id,
        label: school.name,
    }));
    const router = useRouter();
    const [selected, setSelected] = useState<
        { value: number; label: string } | null | string
    >(null);
    const [created, setCreated] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    useEffect(() => {
        if (created) {
            setSelected(created);
        } else setSelected(null);
    }, [created]);
    async function handleSubmit() {
        setSubmitted(true);
        if (!selected) {
            toast.info("Please select a school");
            setSubmitted(false);
            return;
        }
        if (typeof selected === "string") {
            const res = await fetch("/api/school", {
                method: "POST",
                body: JSON.stringify({ name: selected }),
            });
            if (res.ok) {
                toast.success("School created");
                const res2 = await fetch("/api/school", {
                    method: "PUT",
                    body: JSON.stringify({ schoolId: (await res.json()).id }),
                });
                if (res2.ok) {
                    toast.success("School selected");
                    setOpen(false);
                } else {
                    toast.error(
                        "Failed to select school: " + (await res2.text()),
                    );
                    setSubmitted(false);
                }
            } else {
                toast.error("Failed to create school: " + (await res.text()));
                setSubmitted(false);
            }
        }
        if (typeof selected === "object") {
            const res = await fetch("/api/school", {
                method: "PUT",
                body: JSON.stringify({ schoolId: selected.value }),
            });
            if (res.ok) {
                toast.success("School selected");
                setOpen(false);
            } else {
                toast.error("Failed to select school: " + (await res.text()));
                setSubmitted(false);
            }
        }
        router.refresh();
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Select school</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Select school</DialogTitle>
                    <DialogDescription>
                        Choose your school from the list below. Note that this
                        data will only be used to provide teachers an
                        easier time to manage your account.
                    </DialogDescription>
                </DialogHeader>
                <ComboSearch
                    options={schoolValues}
                    onValueChange={setSelected}
                    onCreate={setCreated}
                />
                <DialogFooter>
                    <Button disabled={submitted} onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
