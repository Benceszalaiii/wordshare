import { Class } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function RecentClassSection({ classes, userName, role }: { classes: Class[], userName: string, role: string }) {
    return (
        <section className="mt-8 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border border-border p-4">
            <h2 className=" mb-4 text-xl font-semibold">Recent classes</h2>
            <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-3">
                {classes.length > 0 ? (
                    classes
                        .slice(Math.max(0, classes.length - 3), classes.length)
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
                        })
                ) : (
                    <p className="text-neutral-500">
                        {userName.split(" ")[0]} has yet to{" "}
                        {role === "teacher" || role === "admin"
                            ? "create"
                            : "join"}{" "}
                        classes
                    </p>
                )}
            </div>
        </section>
    );
}
