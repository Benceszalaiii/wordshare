"use client";

import { BookOpen, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { setRoleAction } from "@/app/quickstart/actions";

export function RoleForm({}) {
    const router = useRouter();
    return (
        <>
            <div className="mx-4 mt-6 flex grow flex-col gap-6 md:flex-row">
                <Card className="flex grow basis-1 flex-col">
                    <CardHeader>
                        <UserIcon size={24} />
                        <CardTitle>Student</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            As a student you will be able to join a class,
                            submit essays and practice words.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-1 grow flex-col items-center justify-end">
                        <button
                            onClick={async (e) => {
                                toast.promise(
                                    async () => {
                                        await setRoleAction("student");
                                        router.refresh();
                                    },
                                    {
                                        loading: "Setting Role to Student",
                                        success: "Role set to Student",
                                        error: "Failed to set role",
                                        richColors: true,
                                    },
                                );
                            }}
                            name="select-student"
                            className="p-2 px-4 underline underline-offset-4 transition-all duration-150 hover:text-red-800 hover:underline-offset-2 active:text-red-500"
                        >
                            Select
                        </button>
                        <CardDescription className=" text-neutral-500 dark:text-neutral-500">
                            You need to be a part of a class to access all
                            features.
                        </CardDescription>
                    </CardFooter>
                </Card>
                <Card className="grow basis-1">
                    <CardHeader>
                        <BookOpen size={24} />
                        <CardTitle>Teacher</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            As a teacher you will be able to create classes,
                            assign essays and practice words.
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-1 grow flex-col items-center justify-end">
                        <button
                            onClick={async (e) => {
                                toast.promise(
                                    async () => {
                                        await setRoleAction("teacher");
                                        router.refresh();
                                    },
                                    {
                                        loading: "Setting Role to Teacher",
                                        success: "Role set to Teacher",
                                        error: "Failed to set role",
                                        richColors: true,
                                    },
                                );
                            }}
                            name="select-teacher"
                            className=" p-2 px-4 underline underline-offset-4 transition-all duration-150 hover:text-red-800 hover:underline-offset-2 active:text-red-500"
                        >
                            Select
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
