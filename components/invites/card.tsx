"use server";
import { getClassById, getUserById } from "@/lib/db";
import { Invite } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ActionButtons } from "./actions";

export async function InviteCard({ invite }: { invite: Invite }) {
  const { classId, inviterId } = invite;
  const inviter = await getUserById(inviterId);
  const currentClass = await getClassById(classId);
  if (!currentClass || !inviter) {
    return null;
  }
  return (
    <Card className="w-72 justify-center flex flex-col">
      <CardHeader className="flex flex-row gap-4 justify-start">
        <Avatar>
            <AvatarImage src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/icon`} />
            <AvatarFallback>{currentClass.name.slice(0, 3)}</AvatarFallback>
        </Avatar>
        <div>
            <CardTitle>{currentClass.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-24 max-h-24">
        <p className="line-clamp-2 text-wrap whitespace-pre-wrap">{currentClass.description}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <ActionButtons invite={invite} />
        <p className="text-right text-neutral-400 dark:text-neural-600 pt-2">Invited by: {inviter.name}</p>
        <p className="text-right w-full text-neutral-500 dark:text-neutral-600">{invite.createdAt.toLocaleString("HU")}</p>
      </CardFooter>
    </Card>
  );
}
