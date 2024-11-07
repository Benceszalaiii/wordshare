"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserBanner from "@/components/user/banner";
import MutualClassSection from "@/components/user/mutual";
import RecentClassSection from "@/components/user/recentclasses";
import {
    getClassesByUser,
    getSchoolById,
    getUserById,
    getUserByIdWithClasses,
} from "@/lib/db";
import { getServerSession } from "next-auth";
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
    const currentUser = await getUserById(session?.user.id);
    if (dbUser.private && !(session?.user.id === dbUser.id)) {
        return (
            <section className="mt-24 flex w-full flex-col items-center gap-4 px-4">
                <UserBanner
                    dbUser={dbUser}
                    school={school}
                    canEdit={session?.user.id === dbUser.id}
                />
                <h2>
                    {dbUser.name
                        ? `${dbUser.name.split(" ")[0]}'s profile is private.`
                        : "This user profile is private."}
                </h2>
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
            <RecentClassSection
                classes={classes.slice(
                    Math.max(0, classes.length - 3),
                    classes.length,
                )}
                role={dbUser.role || ""}
                userName={dbUser.name || ""}
            />
            <MutualClassSection
                loggedIn={session ? true : false}
                UserClasses={classes}
                userName={dbUser.name || ""}
                currentUserClasses={await getClassesByUser(
                    session?.user.id || null,
                )}
                own={session?.user.id === dbUser.id}
            />
            <section className="h-screen w-full"></section>
        </section>
    );
}

// TODO METADATA
