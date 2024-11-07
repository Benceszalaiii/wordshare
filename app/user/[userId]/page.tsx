"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import UserBanner from "@/components/user/banner";
import {
    getClassesByUser,
    getSchoolById,
    getUserByIdWithClasses,
} from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { userId: string } }) {
    const dbUser = await getUserByIdWithClasses(params.userId);

    if (!dbUser) {
        return notFound();
    }
    const classes =
        dbUser.role === "student"
            ? dbUser.Classes
            : await getClassesByUser(dbUser.id);
    const school = await getSchoolById(dbUser.schoolId);
    const session = await getServerSession(authOptions);
    if (dbUser.private && !(session?.user.id === dbUser.id)) {
        return (
            <section className="mt-24 flex w-full flex-col items-center gap-4 px-4">
                <UserBanner
                    dbUser={dbUser}
                    school={school}
                    canEdit={session?.user.id === dbUser.id}
                />
                <h2>{dbUser.name ? `${dbUser.name.split(" ")[0]}'s profile is private.`: "This user profile is private."}</h2>
            </section>
        );
    }
    return (
        <section className="mt-24 flex w-full flex-col items-center gap-4 px-4">
            <UserBanner
                dbUser={dbUser}
                school={school}
                canEdit={session?.user.id === dbUser.id}
            />
            <section className="mt-8 flex w-full max-w-screen-md flex-col gap-2 rounded-lg border border-border p-4">
                <h2 className=" mb-4 text-xl font-semibold">Recent classes</h2>
                <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-3">
                    {classes.length > 0 ? (
                        classes
                            .slice(
                                Math.max(0, classes.length - 3),
                                classes.length,
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
                            })
                    ) : (
                        <p className="text-neutral-500">
                            {dbUser.name?.split(" ")[0]} has yet to{" "}
                            {dbUser.role === "teacher" ||
                            dbUser.role === "admin"
                                ? "create"
                                : "join"}{" "}
                            classes
                        </p>
                    )}
                </div>
            </section>
            <section className="h-screen w-full"></section>
        </section>
    );
}
