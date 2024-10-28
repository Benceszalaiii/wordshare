"use client";
import { Class } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import LeaveClassButton from "./leavebutton";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownPinCheck } from "./pin";
import { Ellipsis } from "lucide-react";

const styles = {
    separator: "md:block hidden",
    action: "text-center w-full",
};

const TeacherActions = ({ currentClass }: { currentClass: Class }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost"><Ellipsis className="w-4 h-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{currentClass.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownPinCheck classId={currentClass.id} />
                <DropdownMenuSeparator />
                <DropdownMenuItem>Invite Students</DropdownMenuItem>
                <DropdownMenuItem>Students</DropdownMenuItem>
                <DropdownMenuItem>Edit Class</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default function ClassLegend({
    currentClass,
    canEdit,
}: {
    currentClass: Class;
    canEdit?: boolean | null;
}) {
    const editable = canEdit ?? false;
    return (
        <>
            <section className="px-4">
                {editable ? (
                    <aside className="flex w-full flex-col gap-6 text-gray-800 dark:text-gray-200 md:flex-row md:items-end md:justify-end">
                        {/* <Link
                            className={styles.action}
                            href={`/class/${currentClass.id}/invite`}
                        >
                            Invite students
                        </Link>
                        <p className={styles.separator}>|</p>
                        <Link
                            className={styles.action}
                            href={`/class/${currentClass.id}/students`}
                        >
                            Manage students
                        </Link>
                        <p className={styles.separator}>|</p>
                        <Link
                            className="pr-4"
                            href={`/class/${currentClass.id}/edit`}
                        >
                            Edit Class
                        </Link> */}
                        <TeacherActions currentClass={currentClass} />
                    </aside>
                ) : (
                    <aside className="flex w-full flex-row items-end justify-end gap-6">
                        <LeaveClassButton classId={currentClass.id} />
                    </aside>
                )}
                <Image
                    about="Banner"
                    className="my-4 w-full rounded-xl object-cover"
                    src={`/class/banners/${currentClass.id}`}
                    alt="Class banner"
                    width={410}
                    height={160}
                />
                <div className="flex w-full flex-col justify-start gap-2 px-4">
                    <h1 className=" text-3xl font-bold">{currentClass.name}</h1>
                    <p className="ml-2 text-gray-800 dark:text-gray-400">
                        {currentClass.description}
                    </p>
                </div>
            </section>
        </>
    );
}
