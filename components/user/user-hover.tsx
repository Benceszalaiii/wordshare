import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { User } from "@prisma/client";
import { getInitials } from "@/lib/utils";
import Link from "next/link";

export default function UserHoverCard({user}: {user: User}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">{user.name}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 flex flex-col items-start gap-2">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{user.name}</h4>
                        <p className="text-sm">
                            {user.name} is a member of WordShare.tech
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined {user.createdAt.toLocaleDateString("en-GB", {month: "long", year: "numeric"})}
                            </span>
                        </div>
                    </div>
                </div>
                <Link className="self-end justify-self-end" href={`/user/${user.id}`}>
                <Button size={"sm"} variant={"secondary"} >View profile</Button>
                </Link>
            </HoverCardContent>
        </HoverCard>
    );
}
