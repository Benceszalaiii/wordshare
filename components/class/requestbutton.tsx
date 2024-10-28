"use client";
import { Class } from "@prisma/client";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RequestInviteButton({
    currentClass,
}: {
    currentClass: Class;
}) {
    const router = useRouter();
    return (
        <Button
            onClick={async() => {
                const res = await fetch(`/api/class/request/${currentClass.id}`, {
                    method: "POST",
                });
                toast.info(
                    await res.text(),
                );
                router.refresh();
            }}
        >
            Request Invite
        </Button>
    );
}
