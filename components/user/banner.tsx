"use client";

import { caveat } from "@/app/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalize, dateToLocalTime, getInitials } from "@/lib/utils";
import { Class, School, User } from "@prisma/client";
import { CalendarDaysIcon, GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import { WordPoints } from "../shared/points";

interface UserWithClasses extends User {
    Classes: Class[];
}
export default function UserBanner({
    dbUser,
    school,
}: {
    dbUser: UserWithClasses;
    school: School | null;
}) {
    return (
        <section
            className="sticky top-20 z-10 flex w-full max-w-screen-lg flex-col items-center rounded-lg border border-border bg-neutral-200/90 bg-opacity-85 p-4 backdrop-blur-md dark:bg-neutral-800/90"
            about="User profile"
        >
            <div className="ml-6 flex flex-row items-center gap-4 self-start">
                <Avatar className="h-24 w-24">
                    <AvatarImage src={dbUser.image || ""}></AvatarImage>
                    <AvatarFallback>
                        {getInitials(dbUser.name || "W")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-4">
                        <h1 className="text-3xl font-semibold">
                            {dbUser.name}
                        </h1>
                        <WordPoints points={2000} />
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <CalendarDaysIcon className="h-6 w-6 shrink-0 text-gray-500" />
                        <p className="mt-1 text-gray-500">
                            Member since{" "}
                            {dateToLocalTime(
                                dbUser.createdAt,
                            ).toLocaleDateString("hu", {
                                dateStyle: "medium",
                            })}
                        </p>
                    </div>
                    <div className="line-clamp-2 flex flex-row items-center gap-2 ">
                        <GraduationCapIcon className="h-6 w-6 shrink-0 text-gray-500" />
                        {dbUser.role !== "admin" ? (
                            <p className="mt-1 line-clamp-2 text-gray-500">
                                {capitalize(dbUser.role || "")} at{" "}
                                {school?.url ? (
                                    <Link
                                        className={`underline hover:text-gray-800 hover:underline-offset-2 transition-all duration-300 hover:dark:text-gray-400`}
                                        href={school.url}
                                        target="_blank"
                                    >
                                        {school?.name || "No school"}
                                    </Link>
                                ) : (
                                    school?.name || "No school"
                                )}
                            </p>
                        ) : (
                            <p className="mt-1 truncate text-gray-500">
                                Developer at{" "}
                                <span className={caveat.className}>
                                    WordShare
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
