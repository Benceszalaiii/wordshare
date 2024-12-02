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
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";
import { Session } from "next-auth";
import { SignInButton } from "../shared/buttons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import RequestInviteButton from "./requestbutton";
const styles = {
    separator: "md:block hidden",
    action: "text-center w-full",
};

const TeacherActions = ({ currentClass }: { currentClass: Class }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <Ellipsis className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{currentClass.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/class/${currentClass.id}/invite`}>
                        Invite Students
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/class/${currentClass.id}/students`}>
                        Students
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/class/${currentClass.id}/edit`}>
                        Edit Class
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const pinFallback = <>Loading state...</>;

const StudentActions = ({ currentClass }: { currentClass: Class }) => {
    return (
        <AlertDialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                        <Ellipsis className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{currentClass.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger className="w-full">
                        <DropdownMenuItem className="w-full cursor-pointer font-semibold text-red-700 focus:text-red-500">
                            Leave Class
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently leave this class? You will need to be
                        re-invited to rejoin.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Stay in class</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <LeaveClassButton classId={currentClass.id} />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

const JoinClass = ({ currentClass }: { currentClass: Class }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Join {currentClass.name}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        To join {currentClass.name}, you need to request an
                        invite from the teacher.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        You can do that by directly messaging the teacher or by
                        clicking the button below. The teacher will be notified
                        of your request.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Maybe later</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <RequestInviteButton currentClass={currentClass} />
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default function ClassLegend({
    currentClass,
    canEdit,
    isAnon,
    session,
    bannerUrl,
}: {
    currentClass: Class;
    canEdit?: boolean | null;
    isAnon?: boolean;
    session?: Session;
    bannerUrl: string;
}) {
    return (
        <>
            <section className="px-4">
                <div className="flex w-full flex-col justify-start gap-2 px-4">
                    <div className="flex flex-col-reverse justify-between sm:flex-row">
                        <h1
                            className={`w-full text-center text-3xl font-bold sm:text-start ${
                                isAnon ? "text-center" : ""
                            }`}
                        >
                            {isAnon ? (
                                <>
                                    Join{" "}
                                    <span className="font-bold text-main-700">
                                        {currentClass.name}
                                    </span>{" "}
                                    today!
                                </>
                            ) : (
                                currentClass.name
                            )}
                        </h1>
                        {isAnon
                            ? !session && (
                                  <SignInButton
                                      session={session || null}
                                      className="w-full"
                                      signInText={`Sign in to interact with ${currentClass.name}`}
                                  />
                              )
                            : null}
                    </div>
                    <p className={`ml-2 text-gray-800 dark:text-gray-400`}>
                        {currentClass.description}
                    </p>
                    {isAnon && session && (
                        <JoinClass currentClass={currentClass} />
                    )}
                </div>
                <Image
                    about="Banner"
                    className="my-4 aspect-[41/16] h-full max-w-screen-lg rounded-xl"
                    src={bannerUrl}
                    alt="Class banner"
                    priority={false}
                    unoptimized
                    placeholder="empty"
                    width={820}
                    height={320}
                />
                <Separator />
            </section>
        </>
    );
}
