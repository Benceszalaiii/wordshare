"use server";

import { RoleForm } from "@/components/quickstart/role-form";
import StudentModal from "@/components/quickstart/studentmodal";
import { SignInButton } from "@/components/shared/buttons";
import { Button } from "@/components/ui/button";
import { getSchools, getUserById } from "@/lib/db";
import Link from "next/link";
import { caveat } from "../fonts";
import { auth } from "@/lib/auth";
const styling = {
    section: "flex flex-col gap-2 items-center pt-12",
    h1: "text-2xl font-serif mb-8",
    completed: "font-serif text-lg text-neutral-400",
    active: "font-serif text-lg",
};

export default async function Page() {
    // return (<>
    // This page is work in progress. Make sure to check back later.
    // </>)
    const session = await auth();
    const user = session?.user;
    if (!user?.id) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <p className={styling.active}>1. Authenticate using Google.</p>
                <SignInButton session={session} />
            </section>
        );
    }
    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <p>
                    Something went wrong. Try signing in again. If that
                    doesn&apos;t work, contact the page developer
                </p>
            </section>
        );
    }
    if (dbUser.role === "admin") {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                </div>
                <p className="text-center">
                    You are an admin. You can access all features.
                </p>
            </section>
        );
    }
    if (
        !dbUser?.role ||
        (dbUser.role !== "teacher" && dbUser.role !== "student")
    ) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                    <p className={styling.active}>2. Choose account type</p>
                </div>
                <RoleForm />
            </section>
        );
    }
    if (!dbUser.schoolId) {
        const schools = await getSchools();
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                    <p className={styling.completed}>
                        2. Choose account type ✅
                    </p>
                    <p className={styling.active}>3. Select school</p>
                </div>
                <p className="mt-4 text-center">
                    Continue by selecting your educational facility.
                </p>
                <StudentModal schools={schools} />
            </section>
        );
    }
    if (dbUser.role === "teacher" && !dbUser.teacherVerified) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                    <p className={styling.completed}>
                        2. Choose account type ✅
                    </p>
                    <p className={styling.completed}>3. Select school✅</p>
                    <p className={styling.active}>4. Verification submitted</p>
                </div>
                <p className="mt-4">
                    You are set up for now. Wait for our team to verify you.
                </p>
            </section>
        );
    }
    if (dbUser.role === "student") {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                    <p className={styling.completed}>
                        2. Choose account type ✅
                    </p>
                    <p className={styling.completed}>3. Select school✅</p>
                    <p className={styling.active}>4. Done for now</p>
                </div>
                <p className="mt-4 text-center">
                    You are set up for now. <br /> Start by joining a class.{" "}
                    <br /> Ask your teacher to invite you to a class.
                </p>
            </section>
        );
    }
    if (dbUser.role === "teacher" && dbUser.teacherVerified) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>
                    Get started with{" "}
                    <span className={`${caveat.className}`}>WordShare</span>
                </h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>
                        1. Authenticate with Google ✅{" "}
                    </p>
                    <p className={styling.completed}>
                        2. Choose account type ✅
                    </p>
                    <p className={styling.completed}>3. Select school✅</p>
                    <p className={styling.completed}>4. Verified ✅</p>
                </div>
                <p className="mt-4 text-center">
                    You are all set up. <br /> Start by creating a class
                </p>
                <Button variant={"outline"} asChild>
                    <Link href={"/class/create"}> Create class</Link>
                </Button>
            </section>
        );
    }
}
