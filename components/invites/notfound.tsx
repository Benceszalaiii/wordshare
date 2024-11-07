"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";

export default function InviteDoesntExist() {
    const router = useRouter();
    const path = usePathname();
    if (path === "/invites") return null;
    return (
        <Dialog defaultOpen onOpenChange={()=> {
            router.replace("/invites");
        }}>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite not found</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    The invite you are looking for doesn&apos;t exist, or you have
                    already accepted/declined it.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
