"use client";
import { FloatingDock } from "@/components/ui/dock";
import { Class } from "@prisma/client";
import {
    CalendarPlus2Icon,
    ClipboardListIcon,
    Clock4Icon,
    CogIcon,
    LucideIcon,
    SendHorizontalIcon,
    SendIcon,
    UserCog2Icon,
    UserPlus2Icon,
} from "lucide-react";
import React from "react";
// import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { AnnouncementModal } from "./announcemodal";
import { ExpandingCard } from "./expanding";
import { NewTaskForm } from "./newtaskmodal";

export type CardType = {
    description: string;
    title: string;
    content: () => React.ReactNode;
    Icon: LucideIcon;
    iconName: string;
};

export default function ClassMenubar({
    currentClass,
    isTeacher,
}: {
    currentClass: Class;
    isTeacher: boolean;
}) {
    const studentList: {
        title: string;
        icon: React.ReactNode;
        href: string;
    }[] = [
        {
            title: currentClass.name,
            icon: (
                <Avatar className="h-full w-full">
                    <AvatarImage
                        src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/icon`}
                    ></AvatarImage>
                    <AvatarFallback>
                        {currentClass.name.slice(0, 3)}
                    </AvatarFallback>
                </Avatar>
            ),
            href: `/class/${currentClass.id}`,
        },
        {
            title: "Tasks",
            icon: (
                <ClipboardListIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/tasks`,
        },
        {
            title: "My submissions",
            icon: (
                <SendIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/submissions`,
        },
    ];
    const links: { title: string; icon: React.ReactNode; href: string }[] = [
        {
            title: currentClass.name,
            icon: (
                <Avatar className="h-full w-full">
                    <AvatarImage
                        src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/icon`}
                    ></AvatarImage>
                    <AvatarFallback>
                        {currentClass.name.slice(0, 3)}
                    </AvatarFallback>
                </Avatar>
            ),
            href: `/class/${currentClass.id}`,
        },
        {
            title: `Edit ${currentClass.name}`,
            icon: (
                <CogIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/edit`,
        },
        {
            title: "Tasks",
            icon: (
                <Clock4Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/tasks`,
        },
        {
            title: "Submissions",
            icon: (
                <SendHorizontalIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/submissions`,
        },
        {
            title: "Invite Students",
            icon: (
                <UserPlus2Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/invite`,
        },
        {
            //? Should migrate this to manage class
            title: "Manage Students",
            icon: (
                <UserCog2Icon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: `/class/${currentClass.id}/students`,
        },
    ];
    // const router = useRouter();
    const isMobile = useIsMobile();
    const cards: CardType[] = [
        {
            title: "New Task",
            description: "Assign a new Task to the class",
            Icon: CalendarPlus2Icon,
            iconName: "task",
            content: () => {
                return (
                    <NewTaskForm
                        classId={currentClass.id}
                        isMobile={isMobile}
                    />
                );
            },
        },
        {
            title: "New Announcement",
            description: "Send a new announcement to the class",
            Icon: SendIcon,
            iconName: "announcement",
            content: ()=> {
                return (
                    <AnnouncementModal classId={currentClass.id} currentClassName={currentClass.name} />
                )
            }
        }
    ];

    return (
        <>
            {isTeacher && (
                <section className="grid w-full my-4 max-w-screen-md grid-cols-1 place-items-center gap-4 md:grid-cols-2">
                    <ExpandingCard cards={cards} />
                </section>
            )}
            <div className="fixed inset-x-4 bottom-4 z-30 w-fit md:mr-auto ml-auto md:inset-x-0">
                <FloatingDock items={isTeacher ? links : studentList} />
            </div>
        </>
    );
}
