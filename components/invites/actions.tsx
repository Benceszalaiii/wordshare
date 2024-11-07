"use client";
import { Button } from "@/components/ui/button";
import { Class, Invite } from "@prisma/client";

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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function ActionButtons({
    invite,
    currentClass,
    isActive,
}: {
    invite: Invite;
    currentClass: Class;
    isActive: boolean;
}) {
    const router = useRouter();
    return (
        <Dialog defaultOpen={isActive}>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Respond</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        You&apos;ve been invited to {currentClass.name}
                    </DialogTitle>
                    <DialogDescription className="flex w-full flex-col items-center justify-center pt-4">
                        <Image
                            src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${invite.classId}/banner`}
                            alt="Class Banner"
                            width={410}
                            height={160}
                            className="w-96 rounded-lg object-cover"
                        />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="w-full justify-center gap-4">
                    <DialogClose asChild>
                        <Button
                            variant={"success"}
                            type="submit"
                            onClick={async () => {
                                const res = await fetch(
                                    `/api/class/invite/${invite.classId}/${invite.userId}`,
                                    {
                                        method: "PUT",
                                        headers: { inviteId: invite.id },
                                    },
                                );
                                if (res.ok) {
                                    toast.success(await res.text());
                                    router.replace(`/class/${invite.classId}`);
                                } else {
                                    toast.error(await res.text());
                                }
                            }}
                        >
                            Accept
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            variant={"destructive"}
                            type="submit"
                            onClick={async () => {
                                const res = await fetch(
                                    `/api/class/invite/${invite.classId}/${invite.userId}`,
                                    {
                                        method: "DELETE",
                                        headers: { inviteId: invite.id },
                                    },
                                );
                                if (res.ok) {
                                    toast.success(await res.text());
                                    router.replace(`/invites`);
                                } else {
                                    toast.error(await res.text());
                                }
                            }}
                        >
                            Decline
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
