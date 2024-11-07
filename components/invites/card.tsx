"use server";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getClassById, getUserById } from "@/lib/db";
import { Invite } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ActionButtons } from "./actions";

export async function InviteCard({
    invite,
    isActive,
}: {
    invite: Invite;
    isActive?: boolean;
}) {
    const { classId, inviterId } = invite;
    const inviter = await getUserById(inviterId);
    const currentClass = await getClassById(classId);
    if (!currentClass || !inviter) {
        return null;
    }
    return (
        <Card className="flex w-72 flex-col justify-center">
            <CardHeader className="flex flex-row justify-start gap-4">
                <Avatar>
                    <AvatarImage
                        src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/icon`}
                    />
                    <AvatarFallback>
                        {currentClass.name.slice(0, 3)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{currentClass.name}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="h-24 max-h-24">
                <p className="line-clamp-2 whitespace-pre-wrap text-wrap">
                    {currentClass.description}
                </p>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <ActionButtons
                    invite={invite}
                    currentClass={currentClass}
                    isActive={isActive || false}
                />
                <p className="dark:text-neural-600 pt-2 text-right text-neutral-400">
                    Invited by: {inviter.name}
                </p>
                <p className="w-full text-right text-neutral-500 dark:text-neutral-600">
                    {invite.createdAt.toLocaleString("HU")}
                </p>
            </CardFooter>
        </Card>
    );
}
