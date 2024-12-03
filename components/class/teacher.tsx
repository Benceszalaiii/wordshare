"use client";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Class } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "../ui/button";

export default function TeacherClassList({
    classes,
}: {
    classes: Class[] | null;
}) {
    if (!classes)
        return (
            <>
                <p className="px-4 md:px-24">You currently have no classes.</p>
            </>
        );
    return (
        <>
            <section className="grid grid-flow-dense h-full grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:px-24 xl:grid-cols-3">
                {classes.map((c) => (
                    <Card
                        className="motion-preset-focus h-48 transform-gpu antialiased"
                        key={c.id}
                    >
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Avatar>
                                <AvatarImage
                                    src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${c.id}/icon`}
                                />
                                <AvatarFallback>
                                    {c.name.slice(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                            <CardTitle className="cursor-default">
                                {c.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="truncate w-full text-neutral-700 dark:text-neutral-300">
                            {c.description}
                        </CardContent>
                        <CardFooter className="flex w-full flex-row items-end justify-end">
                            <Link
                                href={`/class/${c.id}`}
                                className={buttonVariants({
                                    variant: "outline",
                                })}
                            >
                                Go to class
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </section>
        </>
    );
}
