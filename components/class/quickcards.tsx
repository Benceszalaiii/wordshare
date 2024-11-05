"use client";
import {
    CalendarClockIcon,
    CalendarDaysIcon,
    CalendarPlus2Icon,
    ChevronDownIcon,
    ChevronUpIcon,
    LucideIcon,
    PenLineIcon,
    SendIcon,
    Settings2Icon,
} from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NewTaskModal } from "./newtaskmodal";
import { Dialog } from "../ui/dialog";
import { AnnouncementModal } from "./announcemodal";

const CollapsibleTeacherContent = ({
    classId,
    currentClassName,
}: {
    classId: string;
    currentClassName: string;
}) => {
    return (
        <CollapsibleContent
            about="Cards"
            className="my-6 grid grid-cols-2 grid-rows-3 place-content-center place-items-center gap-4 md:grid-cols-3 md:grid-rows-2"
        >
            <CardWithIcon
                classId={classId}
                Icon={CalendarPlus2Icon}
                iconClass="md:group-hover:stroke-green-600 stroke-green-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-green-700"
                title="New Task"
                description="Create a task for your students"
                actionUrl={`/class/${classId}/tasks/create`}
                newTaskWithClassName={currentClassName}
            />
            <CardWithIcon
                classId={classId}
                Icon={CalendarClockIcon}
                iconClass="md:group-hover:stroke-amber-600 stroke-amber-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-amber-700"
                title="Active Tasks"
                description="Tasks that have not reached their deadline"
                actionUrl={`/class/${classId}/scan`}
            />
            <CardWithIcon
                classId={classId}
                Icon={CalendarDaysIcon}
                iconClass="md:group-hover:stroke-violet-600 stroke-violet-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-violet-700"
                title="All Tasks"
                description="All tasks in this class"
                actionUrl={`/class/${classId}/scan`}
            />
            <CardWithIcon
                classId={classId}
                Icon={PenLineIcon}
                iconClass="md:group-hover:stroke-sky-600 stroke-sky-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-sky-700"
                title="New An&shy;nounce&shy;ment"
                description="Share a new announcement with your students"
                actionUrl={`/class/${classId}/scan`}
                announcementWithClassName={currentClassName}
            />
            <CardWithIcon
                classId={classId}
                Icon={SendIcon}
                iconClass="md:group-hover:stroke-pink-400 stroke-pink-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-pink-500"
                title="Latest Sub&shy;mis&shy;sions"
                description="View the latest submissions from your students"
                actionUrl={`/class/${classId}/scan`}
            />
            <CardWithIcon
                classId={classId}
                Icon={Settings2Icon}
                iconClass="md:group-hover:stroke-rose-600 stroke-rose-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-rose-700"
                title="Manage Tasks"
                description="Manage tasks in this class"
                actionUrl={`/class/${classId}/tasks/manage`}
            />
        </CollapsibleContent>
    );
};

const CollapsibleStudentContent = ({ classId }: { classId: string }) => {
    return (
        <CollapsibleContent
            about="Cards"
            className="my-6 grid grid-cols-2 grid-rows-2 place-content-center place-items-center gap-4 md:grid-cols-4 md:grid-rows-1"
        >
            <CardWithIcon
                classId={classId}
                Icon={CalendarClockIcon}
                iconClass="md:group-hover:stroke-amber-600 stroke-amber-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-amber-700"
                title="Active Tasks"
                description="Tasks that have not reached their deadline"
                actionUrl={`/class/${classId}/scan`}
            />
            <CardWithIcon
                classId={classId}
                Icon={CalendarDaysIcon}
                iconClass="md:group-hover:stroke-violet-600 stroke-violet-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-violet-700"
                title="All Tasks"
                description="All tasks in this class"
                actionUrl={`/class/${classId}/scan`}
            />
            <CardWithIcon
                classId={classId}
                Icon={SendIcon}
                iconClass="md:group-hover:stroke-pink-400 stroke-pink-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-pink-500"
                title="Latest Sub&shy;mis&shy;sions"
                description="View the latest submissions from your students"
                actionUrl={`/class/${classId}/tasks/latest`}
            />
            <CardWithIcon
                classId={classId}
                Icon={PenLineIcon}
                iconClass="md:group-hover:stroke-sky-600 stroke-sky-600 md:stroke-black md:dark:stroke-white"
                cardClass="hover:border-sky-700"
                title="New An&shy;nounce&shy;ment"
                description="Share a new announcement with your students"
                actionUrl={`/class/${classId}/scan`}
            />
        </CollapsibleContent>
    );
};

export function QuickCards({
    className,
    classId,
    auth,
    currentClassName,
}: {
    className?: string;
    classId: string;
    auth: "teacher" | "student";
    currentClassName: string;
}) {
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const stored = localStorage.getItem(`quickcards-${classId}`);
        if (stored === null) {
            localStorage.setItem(`quickcards-${classId}`, "true");
            setOpen(true);
            setMounted(true);
        }
        else{
            setOpen(stored === "true");
            setMounted(true);
        }
    }, [classId]);
    useEffect(() => {
        if (mounted) {
            window.localStorage.setItem(
                `quickcards-${classId}`,
                open.toString(),
            );
        }
    }, [open, mounted, classId]);
    return (
        <section className="mt-4 w-full max-w-screen-lg px-4">
            <Collapsible className=" px-4" open={open} onOpenChange={setOpen}>
                <CollapsibleTrigger className="flex w-full flex-row items-center justify-center">
                    <p className="text-lg font-semibold">Quick actions</p>
                    {open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </CollapsibleTrigger>
                {auth === "teacher" ? (
                    <CollapsibleTeacherContent
                        currentClassName={currentClassName}
                        classId={classId}
                    />
                ) : (
                    <CollapsibleStudentContent classId={classId} />
                )}
            </Collapsible>
        </section>
    );
}

function CardWithIcon({
    Icon,
    iconClass,
    title,
    description,
    actionUrl,
    cardClass,
    announcementWithClassName,
    newTaskWithClassName,
    classId,
}: {
    Icon: LucideIcon;
    iconClass?: string;
    title: string;
    description: string;
    actionUrl: string;
    cardClass?: string;
    announcementWithClassName?: string;
    newTaskWithClassName?: string;
    classId: string;
}) {
    if (newTaskWithClassName) {
        return (
            <Dialog>
                <NewTaskModal
                    classId={classId}
                    currentClassName={newTaskWithClassName}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Card
                                    className={cn(
                                        "group h-full w-full transform-gpu antialiased transition-transform hover:scale-105",
                                        cardClass || `hover:border-violet-900`,
                                    )}
                                >
                                    <CardHeader>
                                        <Icon
                                            className={cn(
                                                "h-8 w-8 transform-gpu transition-transform group-hover:scale-105",
                                                `${
                                                    iconClass ||
                                                    " group-hover:stroke-violet-800"
                                                }`,
                                            )}
                                        />
                                        <CardTitle className="hyphens-auto text-wrap lg:hyphens-none">
                                            {title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </NewTaskModal>
            </Dialog>
        );
    }
    if (announcementWithClassName) {
        return (
            <Dialog>
                <AnnouncementModal
                    classId={classId}
                    currentClassName={announcementWithClassName}
                >
                    <TooltipProvider>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <Card
                                    className={cn(
                                        "group h-full w-full transform-gpu antialiased transition-transform hover:scale-105",
                                        cardClass || `hover:border-violet-900`,
                                    )}
                                >
                                    <CardHeader>
                                        <Icon
                                            className={cn(
                                                "h-8 w-8 transform-gpu transition-transform group-hover:scale-105",
                                                `${
                                                    iconClass ||
                                                    " group-hover:stroke-violet-800"
                                                }`,
                                            )}
                                        />
                                        <CardTitle className="hyphens-auto text-wrap lg:hyphens-none">
                                            {title}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </AnnouncementModal>
            </Dialog>
        );
    }
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <Link href={actionUrl} className="h-full w-full">
                        <Card
                            className={cn(
                                "group h-full w-full transform-gpu antialiased transition-transform hover:scale-105",
                                cardClass || `hover:border-violet-900`,
                            )}
                        >
                            <CardHeader>
                                <Icon
                                    className={cn(
                                        "h-8 w-8 transform-gpu transition-transform group-hover:scale-105",
                                        `${
                                            iconClass ||
                                            " group-hover:stroke-violet-800"
                                        }`,
                                    )}
                                />
                                <CardTitle className="hyphens-auto text-wrap lg:hyphens-none">
                                    {title}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
