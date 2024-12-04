"use client";
import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getInitials } from "@/lib/utils";
import { User } from "@prisma/client";
import { VariantProps } from "class-variance-authority";
import { useIsMobile } from "hooks/use-mobile";
import Link from "next/link";

export default function UserHoverCard({
    user,
    className = "",
    variant = { variant: "link", size: "default" },
    schoolName,
}: {
    schoolName?: string;
    user: User;
    className?: string;
    variant?: VariantProps<typeof buttonVariants>;
}) {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <Button
                asChild
                className={className}
                variant={variant.variant}
                size={"sm"}
            >
                <Link href={`/user/${user.id}`}>{user.name}</Link>
            </Button>
        );
    }
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button
                    className={className}
                    variant={variant.variant}
                    size={variant.size}
                >
                    {user.name || "Unknown User"}
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-80 flex-col items-start gap-2">
                <div className="flex justify-between space-x-4">
                    <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{user.name}</h4>
                        <p className="text-sm text-neutral-500">
                            {user.role === "admin"
                                ? "Developer at WordShare"
                                : `${user.name} is a ${user.role} at ${schoolName}`}
                        </p>
                        <div className="flex items-center pt-2">
                            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                            <span className="text-xs text-muted-foreground">
                                Joined{" "}
                                {user.createdAt.toLocaleDateString("en-GB", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
                <Link
                    className="self-end justify-self-end"
                    href={`/user/${user.id}`}
                >
                    <Button size={"sm"} variant={"secondary"}>
                        View profile
                    </Button>
                </Link>
            </HoverCardContent>
        </HoverCard>
    );
}
