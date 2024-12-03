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
import { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { MenubarPinCheck } from "./pin";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { NewTaskModal, NewTaskForm } from './newtaskmodal';
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Drawer, DrawerTrigger } from "../ui/drawer";

export default function ClassMenubar({
    currentClass,
    isTeacher,
}: {
    currentClass: Class;
    isTeacher: boolean;
}) {
    // const router = useRouter();
    const isMobile = useIsMobile();
    const ModalTrigger = isMobile ? DrawerTrigger : DialogTrigger;
    const ModalWrapper = isMobile ? Drawer : Dialog;
    const [modalOpen, setModalOpen] = useState(false);
    if (isTeacher) {
        return (
            <ModalWrapper open={modalOpen} onOpenChange={setModalOpen}>
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
                            <ModalTrigger asChild>
                            <ItemWithIcon Icon={ClipboardPlusIcon}>
                                New Task
                            </ItemWithIcon>
                            </ModalTrigger>
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
                <NewTaskForm classId={currentClass.id} isMobile={isMobile}></NewTaskForm>
            </ModalWrapper>
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
