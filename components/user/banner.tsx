"use client";

import { caveat } from "@/app/fonts";
import { changePrivacy } from "@/app/user/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

import useScroll from "@/lib/hooks/use-scroll";
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
    points,
}: {
    dbUser: UserWithClasses;
    school: School | null;
    canEdit?: boolean;
    bannerDismissed: boolean;
    points: number;
}) {
    const [privacy, setPrivacy] = React.useState<boolean>(dbUser.private);
    const [loading, setLoading] = React.useState<boolean>(false);
    const isSticked = useScroll(bannerDismissed ? 140 : 240);
    React.useEffect(()=> {
        window.scrollTo({top: window.scrollY + 1, behavior: "smooth"});
    }, [])
    const scrollToTop = () => {
        if (!isSticked) return;
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
    return (
        <div
            className={` ${bannerDismissed ? "top-16" : "top-[7.5rem]"} ${
                isSticked
                    ? "fixed border-t border-border select-none bg-white/50 p-2 backdrop-blur-xl dark:bg-black/70 z-50"
                    : "max-w-screen-lg rounded-lg border border-border bg-neutral-200/90 bg-opacity-85 p-4 backdrop-blur-md dark:bg-neutral-800/90"
            }  flex transform-gpu flex-col items-center w-screen max-w-full justify-center overflow-hidden transition-all duration-500 `}
            about="User profile"
        >
            <div
                className={`flex w-full flex-row items-center overflow-hidden gap-4 pl-4 md:pl-24 ${
                    !isSticked && "self-start"
                }`}
            >
                <Avatar
                onClick={scrollToTop}
                    className={` transition-all ${
                        isSticked
                            ? "h-8 w-8 md:h-12 my-1 md:w-12 cursor-pointer"
                            : "h-12 w-12 md:h-24 md:w-24"
                    }`}
                >
                    <AvatarImage src={dbUser.image || ""}></AvatarImage>
                    <AvatarFallback>
                        {getInitials(dbUser.name || "W")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full gap-2">
                    <div
                        className={`flex w-full ${
                            isSticked ? "flex-row" : "flex-col-reverse"
                        } gap-4 sm:flex-row`}
                    >
                        <h1
                        onClick={scrollToTop}
                            className={`${
                                isSticked ? "text-xl cursor-pointer" : "text-3xl"
                            } pr-4 font-semibold transition-all `}
                        >
                            {dbUser.name}
                        </h1>
                        <div
                            className={`ml-auto mr-4 flex flex-row items-center gap-2 self-start ${
                                isSticked && "mr-8"
                            }`}
                        >
                            <WordPoints points={points} />
                            {canEdit && (
                                <>
                                    <Checkbox
                                        id="privacy"
                                        className={`ml-4 ${
                                            isSticked && "hidden"
                                        }`}
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
                                                    closeButton: true,
                                                },
                                            );
                                            setTimeout(() => {
                                                setLoading(false);
                                            }, 4000);
                                        }}
                                    />
                                    <Label
                                        className={`${
                                            isSticked && "hidden"
                                        } ml-auto mr-8`}
                                        htmlFor="privacy"
                                    >
                                        Private profile
                                    </Label>
                                </>
                            )}
                        </div>
                    </div>
                    <div
                        className={`flex flex-row items-center gap-2 ${
                            isSticked && "hidden"
                        }`}
                    >
                        <CalendarDaysIcon className="w-6 h-6 text-gray-500 shrink-0" />
                        <p className="pr-2 mt-1 text-gray-500 line-clamp-2">
                            Member since{" "}
                            {dateToLocalTime(
                                dbUser.createdAt,
                            ).toLocaleDateString("hu", {
                                dateStyle: "medium",
                            })}
                        </p>
                    </div>
                    <div
                        className={`line-clamp-2 flex flex-row items-center gap-2 ${
                            isSticked && "hidden"
                        }`}
                    >
                        <GraduationCapIcon className="w-6 h-6 text-gray-500 shrink-0" />
                        {dbUser.role !== "admin" ? (
                            <p className="pr-2 mt-1 text-gray-500 line-clamp-2">
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
                            <p className="w-full pr-2 mt-1 text-gray-500 line-clamp-2">
                                Developer at{" "}
                                <span className={caveat.className}>
                                    WordShare
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
