"use client";

import { useEffect, useState, useCallback } from "react";
import * as React from "react";

import {
    LayoutDashboard,
    EditIcon,
    List,
    HouseIcon,
    SquareSlashIcon,
    BlendIcon,
    Shapes,
} from "lucide-react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandShortcut,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Command } from "./commandprovider";
import { Class } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

const iconstyles = "mr-2 h-4 w-4";

export function CommandBox({
    commands,
    classes,
}: {
    commands: Command[];
    classes: Class[];
}) {
    const { setTheme } = useTheme();
    const router = useRouter();
    const redirect = useCallback(
        (path: string) => {
            router.push("/" + path);
            setOpen(false);
        },
        [router],
    );
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.metaKey || e.ctrlKey) {
                switch (e.key) {
                    case " ":
                        e.preventDefault();
                        setOpen((open) => !open);
                        break;
                    case "Backspace":
                        e.preventDefault();
                        break;
                    default:
                        const command = commands.find((c) => c.key === e.key);
                        if (command) {
                            e.preventDefault();
                            redirect(command.path);
                            toast(
                                `Navigated to ${command.title} using shortcut`,
                                {
                                    action: {
                                        label: "Undo",
                                        onClick: () => {
                                            router.back();
                                        },
                                    },
                                    duration: 2500,
                                    richColors: true,
                                    position: "bottom-center",
                                },
                            );
                        }
                        break;
                }
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [redirect, router, commands]);
    return (
        <>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {commands.map((command) => {
                            return (
                                <CommandItem
                                    onSelect={() => {
                                        redirect(command.path);
                                    }}
                                    className="hover:cursor-pointer"
                                    key={command.key}
                                >
                                    {command.icon}
                                    <span>{command.title}</span>
                                    <CommandShortcut>
                                        ⌘{command.key.toUpperCase()}
                                    </CommandShortcut>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                    {classes && classes.length > 0 ? (
                        <CommandGroup heading="Classes">
                            {classes.map((item) => {
                                return (
                                    <CommandItem
                                        onSelect={() => {
                                            redirect(`class/${item.id}`);
                                        }}
                                        className="hover:cursor-pointer"
                                        key={item.id}
                                    >
                                        <Avatar>
                                            <AvatarImage
                                                className="aspect-square object-cover object-center"
                                                src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${item.id}/icon`}
                                            />
                                            <AvatarFallback>
                                                {getInitials(item.name || "")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>{item.name}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    ) : null}
                    <CommandGroup heading="Theme">
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                setTheme("light");
                                toast("Switched to Light theme", {
                                    duration: 2000,
                                    richColors: true,
                                    position: "bottom-center",
                                });
                            }}
                        >
                            <SunIcon className="mr-2 h-4 w-4" />
                            <span>Switch to Light theme</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => {
                                setOpen(false);
                                setTheme("dark");
                                toast("Switched to Dark theme", {
                                    duration: 2000,
                                    richColors: true,
                                    position: "bottom-center",
                                });
                            }}
                        >
                            <MoonIcon className="mr-2 h-4 w-4" />
                            <span>Switch to Dark theme</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
