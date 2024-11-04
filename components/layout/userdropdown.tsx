"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSubContent,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import {
    BlendIcon,
    EditIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    LucideIcon,
    ShapesIcon,
} from "lucide-react";
import { capitalize, getInitials } from "@/lib/utils";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const stylings = {
    avatar: "border border-border cursor-pointer",
};
export default function UserDropdown({
    session,
    role,
}: {
    session: Session;
    role: string | null | undefined;
}) {
    const isMobile = useIsMobile();
    const router = useRouter();
    const redirectTo = (path: string) => {
        router.push(path[0] === "/" ? path.slice(1) : path);
    };
    if (!session.user.email) return null;
    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger asChild>
                    <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 focus:outline-none active:scale-95 dark:border-gray-700 sm:h-9 sm:w-9">
                        <Image
                            alt={session.user.email || "User profile picture"}
                            src={session.user.image || "/avatar.webp"}
                            width={40}
                            height={40}
                        />
                    </button>
                </DrawerTrigger>
                <DrawerContent className="w-full">
                    <DrawerHeader>
                        <DrawerTitle>{session.user.name}</DrawerTitle>
                        <DrawerDescription>
                            {capitalize(role || "no role yet")}
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerDescription className="flex w-full flex-col items-start justify-start gap-1 px-2">
                        <DrawerItemWithIcon
                            onClick={() => {
                                redirectTo("/overview");
                            }}
                            Icon={LayoutDashboardIcon}
                        >
                            Overview
                        </DrawerItemWithIcon>
                        <DrawerItemWithIcon
                            onClick={() => {
                                redirectTo("/class");
                            }}
                            Icon={ShapesIcon}
                        >
                            Classes
                        </DrawerItemWithIcon>
                        <DrawerItemWithIcon
                            onClick={() => {
                                redirectTo("/essay");
                            }}
                            Icon={EditIcon}
                        >
                            Essays
                        </DrawerItemWithIcon>
                        <DrawerItemWithIcon
                            onClick={() => {
                                redirectTo("/wordplay");
                            }}
                            Icon={BlendIcon}
                        >
                            WordPlay
                        </DrawerItemWithIcon>
                        <DrawerItemWithIcon
                            onClick={() => {
                                signOut();
                            }}
                            className="text-red-500 hover:text-red-600 focus:text-red-600"
                            Icon={LogOutIcon}
                        >
                            Log out
                        </DrawerItemWithIcon>
                    </DrawerDescription>
                    <DrawerFooter className="mb-4 mt-6 text-center text-sm text-neutral-500">
                        {session.user.email}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 focus:outline-none active:scale-95 dark:border-gray-700 sm:h-9 sm:w-9">
                    <Image
                        alt={session.user.email || "User profile picture"}
                        src={session.user.image || "/avatar.webp"}
                        width={40}
                        height={40}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-48 space-y-1 border border-border"
            >
                <div className="p-2">
                    <h2 className="">{session.user.name}</h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {capitalize(role || "No Role Yet")}
                    </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownItemWithIcon
                    onClick={() => {
                        redirectTo("/overview");
                    }}
                    Icon={LayoutDashboardIcon}
                >
                    Overview
                </DropdownItemWithIcon>
                <DropdownItemWithIcon
                    onClick={() => {
                        redirectTo("/class");
                    }}
                    Icon={ShapesIcon}
                >
                    Classes
                </DropdownItemWithIcon>
                <DropdownItemWithIcon
                    onClick={() => {
                        redirectTo("/essay");
                    }}
                    Icon={EditIcon}
                >
                    Essays
                </DropdownItemWithIcon>
                <DropdownItemWithIcon
                    onClick={() => {
                        redirectTo("/wordplay");
                    }}
                    Icon={BlendIcon}
                >
                    WordPlay
                </DropdownItemWithIcon>
                <DropdownMenuSeparator />
                <DropdownItemWithIcon
                    onClick={() => {
                        signOut();
                    }}
                    className="text-red-500 focus:text-red-600"
                    Icon={LogOutIcon}
                >
                    Log out
                </DropdownItemWithIcon>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const DropdownItemWithIcon = ({
    children,
    Icon,
    onClick,
    className,
}: {
    children: React.ReactNode;
    Icon: LucideIcon;
    className?: string;
    onClick?: () => void;
}) => {
    return (
        <DropdownMenuItem
            onClick={onClick}
            className={twMerge(
                "flex cursor-pointer flex-row items-center gap-4",
                className,
            )}
        >
            <Icon className="ml-2 h-4 w-4" />
            {children}
        </DropdownMenuItem>
    );
};

const DrawerItemWithIcon = ({
    children,
    className,
    Icon,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    Icon: LucideIcon;
    onClick?: () => void;
}) => {
    return (
        <Button
            onClick={onClick}
            className={twMerge(
                "flex w-full cursor-pointer justify-start gap-4",
                className,
            )}
            variant={"ghost"}
        >
            <Icon className="h-4 w-4" />
            {children}
        </Button>
    );
};
