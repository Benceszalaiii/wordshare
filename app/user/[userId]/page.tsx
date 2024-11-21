"use server";
import { isBannerDismissed } from "@/app/actions";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import UserBanner from "@/components/user/banner";
import MutualClassSection from "@/components/user/mutual";
import PokeCards from "@/components/user/pokecard";
import RecentClassSection from "@/components/user/recentclasses";
import {
    getAllPointsUser,
    getClassesByUser,
    getEssaysByUserId,
    getSchoolById,
    getUserById,
    getUserByIdWithClasses,
} from "@/lib/db";
import { Metadata } from 'next';
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
    const bannerDismissed = await isBannerDismissed();
    const points = await getAllPointsUser(dbUser.id); // Since this will probably not have more than 5 classes, we can just use Array.Prototype.reduce to sum the points, O(n) is fine here.
    // Cannot send points: Point[] to client, would expose too much information. Hence sum is server sided.
    const currentUser = await getUserById(session?.user.id);
    if (
        dbUser.private &&
        !(session?.user.id === dbUser.id) &&
        currentUser?.role !== "admin"
    ) {
        return (
            <section className="mt-24 flex w-full flex-col items-center gap-4 px-4">
                <UserBanner
                    bannerDismissed={bannerDismissed}
                    dbUser={dbUser}
                    school={school}
                    canEdit={session?.user.id === dbUser.id}
                    points={points.reduce((a, b) => a + b.points, 0)}
                />
                <h2>
                    {dbUser.name
                        ? `${dbUser.name.split(" ")[0]}'s profile is private.`
                        : "This user profile is private."}
                </h2>
            </section>
        );
    }
    const essays = await getEssaysByUserId(dbUser.id);
    const wordCount = essays.reduce((a, b) => a + (b.wordCount || 0), 0);
    return (
        <section className="mt-24 flex w-full flex-col items-center gap-4 px-4">
            <UserBanner
                dbUser={dbUser}
                school={school}
                canEdit={session?.user.id === dbUser.id}
                bannerDismissed={bannerDismissed}
                points={points.reduce((a, b) => a + b.points, 0)}
            />
            <PokeCards streak={0} essays={essays.length}  wordCount={wordCount} />
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
            <section className="h-screen w-full"/>
        </section>
    );
}


export async function generateMetadata({params}: {params: {userId: string}}): Promise<Metadata>{
    const dbUser = await getUserByIdWithClasses(params.userId);
    if (!dbUser){
        return {
            title: "User not found",
            description: "User not found. | WordShare"
        }
    }
    return {
        title: `${dbUser.name}`,
        description: `${dbUser.name} | WordShare`,
    }
}