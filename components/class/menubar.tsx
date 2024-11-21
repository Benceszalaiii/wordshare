"use client";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Class } from "@prisma/client";
import {
    ClipboardPlusIcon,
    CogIcon,
    HouseIcon,
    LucideIcon,
    SquareGanttChartIcon,
    UserRoundPlusIcon,
    UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { MenubarPinCheck } from "./pin";

export default function ClassMenubar({
    currentClass,
    isTeacher,
}: {
    currentClass: Class;
    isTeacher: boolean;
}) {
    // const router = useRouter();
    if (isTeacher) {
        return (
            <>
                <Menubar className="py-2">
                    <MenubarMenu>
                        <MenubarTrigger>{currentClass.name}</MenubarTrigger>
                        <MenubarContent>
                                <MenubarPinCheck classId={currentClass.id} />
                                <MenubarSeparator/>
                                <ItemWithIcon href={`/class/${currentClass.id}/`} Icon={HouseIcon}>
                                    Front page
                                </ItemWithIcon>
                            <ItemWithIcon href={`/class/${currentClass.id}/edit`} Icon={CogIcon}>
                                Class Settings
                            </ItemWithIcon>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Tasks</MenubarTrigger>
                        <MenubarContent>
                            <ItemWithIcon Icon={ClipboardPlusIcon}>
                                New Task
                            </ItemWithIcon>
                            <ItemWithIcon href={`/class/${currentClass.id}/tasks`} Icon={SquareGanttChartIcon}>
                                View Tasks
                            </ItemWithIcon>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Students</MenubarTrigger>
                        <MenubarContent>
                            <ItemWithIcon href={`/class/${currentClass.id}/invite`} Icon={UserRoundPlusIcon}>
                                Invite Students
                            </ItemWithIcon>
                            <ItemWithIcon href={`/class/${currentClass.id}/students`} Icon={UsersRoundIcon}>
                                Manage Students
                            </ItemWithIcon>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </>
        );
    }
    return (
        <>
            <Menubar>
            <MenubarMenu>
                        <MenubarTrigger>{currentClass.name}</MenubarTrigger>
                        <MenubarContent>
                                <MenubarPinCheck classId={currentClass.id} />
                                <MenubarSeparator/>
                                <ItemWithIcon href={`/class/${currentClass.id}/`} Icon={HouseIcon}>
                                    Front page
                                </ItemWithIcon>
                        </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger>Tasks</MenubarTrigger>
                        <MenubarContent>
                            <ItemWithIcon href={`/class/${currentClass.id}/tasks`} Icon={SquareGanttChartIcon}>
                                View Tasks
                            </ItemWithIcon>
                        </MenubarContent>
                    </MenubarMenu>
            </Menubar>
        </>
    );
}

const ItemWithIcon = ({
    Icon,
    className,
    children,
    href,
    onClick
}: {
    Icon: LucideIcon;
    className?: string;
    children: ReactNode;
    href?: string;
    onClick?: () => void;
}) => {
    if (href) {
        return (
            <Link href={href}>
                <MenubarItem
                    className={twMerge(
                        "flex flex-row items-center gap-2",
                        className,
                    )}
                >
                    <Icon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
                    {children}
                </MenubarItem>
            </Link>
        );
    }
    return (
        <MenubarItem
        onClick={onClick}
            className={twMerge("flex flex-row items-center gap-2", className)}
        >
            <Icon className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
            {children}
        </MenubarItem>
    );
};
