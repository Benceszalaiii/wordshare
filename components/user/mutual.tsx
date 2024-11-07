"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Class } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function MutualClassSection({
    currentUserClasses,
    UserClasses,
    userName,
    loggedIn,
    own
}: {
    currentUserClasses: Class[];
    UserClasses: Class[];
    userName: string;
    loggedIn: boolean;
    own: boolean
}) {
    if (own){
        return (
            <section className="mt-8 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border border-border p-4">
            <h2 className=" mb-4 text-xl font-semibold">Mutual classes</h2>
            <p className="text-gray-500">
                Your mutual classes with your profile visitors will appear here for them
            </p>
        </section>
        )
    }
    if (!loggedIn) {
        return (
            <section className="mt-8 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border border-border p-4">
                <h2 className=" mb-4 text-xl font-semibold">Mutual classes</h2>
                <p className="text-gray-500">
                    You need to log in to see your mutual classes
                </p>
            </section>
        );
    }
    const mutualClasses = currentUserClasses.filter((cls) =>
        UserClasses.some((ucls) => ucls.id === cls.id),
    );
    return (
        <section className="mt-8 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border border-border p-4">
            <h2 className=" mb-4 text-xl font-semibold">Mutual classes</h2>
            {mutualClasses.length > 0 ? (
                <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-3">
                    {mutualClasses
                        .slice(
                            Math.max(0, mutualClasses.length - 3),
                            mutualClasses.length,
                        )
                        .map((cls) => {
                            return (
                                <Card
                                    className="flex h-48 grow transform-gpu flex-col justify-between antialiased transition-all duration-500 hover:scale-110"
                                    key={cls.id}
                                >
                                    <CardHeader className="flex flex-row items-center gap-2">
                                        <Avatar>
                                            <AvatarImage
                                                src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${cls.id}/icon`}
                                            />
                                            <AvatarFallback>
                                                {cls.name.slice(0, 2)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <CardTitle>{cls.name}</CardTitle>
                                    </CardHeader>
                                    <CardFooter className="mt-auto flex w-full flex-row items-end justify-end">
                                        <Link
                                            href={`/class/${cls.id}`}
                                            className={buttonVariants({
                                                variant: "outline",
                                            })}
                                        >
                                            Go to class
                                        </Link>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                </div>
            ) : (
                <p className="w-full text-neutral-500">
                    You have no classes in common with {userName}
                </p>
            )}
        </section>
    );
}
