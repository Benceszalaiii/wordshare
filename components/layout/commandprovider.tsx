"use server";
import { getClassesByUser } from "@/lib/db";
import {
    BlendIcon,
    EditIcon,
    HouseIcon,
    LayoutDashboard,
    Shapes,
    SquareSlashIcon,
} from "lucide-react";
import { CommandBox } from "./command";
import { auth } from "@/lib/auth";
export interface Command {
    key: string;
    path: string;
    icon: React.ReactNode;
    title: string;
}
const iconstyles = "mr-2 h-4 w-4";
const commands: Command[] = [
    {
        key: "o",
        path: "overview",
        icon: <LayoutDashboard className={iconstyles} />,
        title: "Overview",
    },
    {
        key: "e",
        path: "essay",
        icon: <EditIcon className={iconstyles} />,
        title: "Essays",
    },
    {
        key: "p",
        path: "wordplay",
        icon: <BlendIcon className={iconstyles} />,
        title: "WordPlay",
    },
    {
        key: "/",
        path: "shortcuts",
        icon: <SquareSlashIcon className={iconstyles} />,
        title: "Shortcuts",
    },
    {
        key: "h",
        path: "",
        icon: <HouseIcon className={iconstyles} />,
        title: "Home page",
    },
    {
        key: "k",
        path: "class",
        icon: <Shapes className={iconstyles} />,
        title: "Classes",
    },
];
export async function getCommands() {
    return commands;
}
export async function CommandProvider() {
    const session = await auth();
    const classes = await getClassesByUser(session?.user?.id || null);
    return <CommandBox commands={commands} classes={classes} />;
}
