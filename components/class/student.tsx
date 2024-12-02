import { Class } from "@prisma/client";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function StudentClassList({
    classes,
}: {
    classes: Class[] | null;
}) {
    if (!classes)
        return (
            <section>
                <p className="flex flex-col justify-center gap-4 px-4 md:px-24">
                    You currently have no classes. Check your{" "}
                    <Link href={"/class/invites"} className="underline">
                        invites
                    </Link>{" "}
                    or ask your teacher to invite
                </p>
            </section>
        );
    return (
        <section className="flex flex-col justify-center gap-4 px-4 md:px-24 ">
            {classes.map((c) => (
                    <Card
                    className="motion-preset-focus flex h-48 grow transform-gpu flex-col justify-between antialiased"
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
                    <CardContent className="line-clamp-3 text-neutral-700 dark:text-neutral-300">
                        {c.description}
                    </CardContent>
                    <CardFooter className="mt-auto flex w-full flex-row items-end justify-end">
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
    );
}
