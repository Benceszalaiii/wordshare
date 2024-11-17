"use client";

import { caveat } from "@/app/fonts";
import { changePrivacy } from "@/app/user/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { capitalize, dateToLocalTime, getInitials } from "@/lib/utils";
import { Class, School, User } from "@prisma/client";
import { CalendarDaysIcon, GraduationCapIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { toast } from "sonner";
import { WordPoints } from "../shared/points";
import { Label } from "../ui/label";

interface UserWithClasses extends User {
    Classes: Class[];
}
export default function UserBanner({
    dbUser,
    school,
    canEdit,
    bannerDismissed,
    points
}: {
    dbUser: UserWithClasses;
    school: School | null;
    canEdit?: boolean;
    bannerDismissed: boolean;
    points: number
}) {
    const [privacy, setPrivacy] = React.useState<boolean>(dbUser.private);
    const [loading, setLoading] = React.useState<boolean>(false);
    return (
        <section
            className={`sticky ${bannerDismissed ? "top-20" : "top-32"} z-10 flex w-full max-w-screen-lg flex-col items-center rounded-lg border border-border bg-neutral-200/90 bg-opacity-85 p-4 backdrop-blur-md dark:bg-neutral-800/90`}
            about="User profile"
        >
            <div className="ml-6 flex w-full flex-row items-center gap-4 self-start">
                <Avatar className="h-12 md:h-24 w-12 md:w-24">
                    <AvatarImage src={dbUser.image || ""}></AvatarImage>
                    <AvatarFallback>
                        {getInitials(dbUser.name || "W")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full flex-col-reverse sm:flex-row gap-4">
                        <h1 className="text-3xl font-semibold pr-4">
                            {dbUser.name}
                        </h1>
                        <div className="ml-auto mr-4 flex flex-row items-center gap-2 self-start">
                            <WordPoints points={points} />
                            {canEdit && (
                                <>
                                    <Checkbox
                                        id="privacy"
                                        className="ml-4"
                                        checked={privacy}
                                        disabled={loading}
                                        onCheckedChange={(e) => {
                                            setLoading(true);
                                            toast.promise(
                                                changePrivacy(
                                                    dbUser.id,
                                                    e as boolean,
                                                ).then((res) => {
                                                    if (res === false) {
                                                        throw new Error(
                                                            "Error occured",
                                                        );
                                                    }
                                                    {
                                                        setPrivacy(
                                                            e as boolean,
                                                        );
                                                    }
                                                }),
                                                {
                                                    loading:
                                                        "Changing privacy preferences...",
                                                    success:
                                                        "Successfully changed privacy.",
                                                    error: "An error occured. Try again later.",
                                                    dismissible: true,
                                                    closeButton: true
                                                },
                                            );
                                            setTimeout(() => {
                                                setLoading(false);
                                            }, 4000);
                                        }}
                                    />
                                    <Label
                                        className="ml-auto"
                                        htmlFor="privacy"
                                    >
                                        Private profile
                                    </Label>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                        <CalendarDaysIcon className="h-6 w-6 shrink-0 text-gray-500" />
                        <p className="mt-1 text-gray-500 pr-2 line-clamp-2">
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
                            <p className="mt-1 line-clamp-2 text-gray-500 pr-2">
                                {capitalize(dbUser.role || "")} at{" "}
                                {school?.url ? (
                                    <Link
                                        className={`underline transition-all duration-300 hover:text-gray-800 hover:underline-offset-2 hover:dark:text-gray-400`}
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
                            <p className="mt-1 line-clamp-2 text-gray-500 w-full pr-2">
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
