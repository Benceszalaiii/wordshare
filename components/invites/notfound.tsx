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
import { Button } from "../ui/button";

export default function InviteDoesntExist() {
    return (
        <Dialog defaultOpen>
            <DialogTrigger></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite not found</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    The invite you are looking for doesn't exist, or you have
                    already accepted/declined it.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
