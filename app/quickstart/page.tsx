import { getServerSession } from "next-auth";
import { caveat } from "../fonts";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";
import { Label } from "@/components/label"
import { RadioGroup, RadioGroupItem } from "@/components/radio-group"
import { changeRoleById, getUserByEmail, getUserById } from "@/lib/db";
import { Button } from "@/components/button";
import { toast } from "sonner";
const styling = {
    section: "flex flex-col gap-2 items-center pt-12",
    h1: "text-2xl font-serif mb-8",
    completed: "font-serif text-lg text-neutral-400",
    active: "font-serif text-lg"
}

export default async function Page() {
    const auth = await getServerSession(authOptions);
    const user = auth?.user;
    if (!user?.id) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>Get started with <span className={`${caveat.className}`}>WordShare</span></h1>
                <p className={styling.active}>1. Create an account, or sign in using Google.</p>
                <SignInButton session={auth} />
            </section>
        );
    }
    const dbUser = await getUserById(user.id);
    if (!dbUser?.role) {
        return (
            <section className={styling.section}>
                <h1 className={styling.h1}>Get started with <span className={`${caveat.className}`}>WordShare</span></h1>
                <div className="flex flex-col items-center gap-2">
                    <p className={styling.completed}>1. Create an account, or sign in using Google. ✅ </p>
                    <p className={styling.active}>2. Choose account type</p>
                </div>
                <form action={async (e) => {
                    "use server";
                    const newRole = e.get("role-select")?.toString();
                    await changeRoleById(user.id, newRole);
                }} className="flex flex-col gap-3">
                    <RadioGroup defaultValue="student" name="role-select" className="flex-col flex mt-4 font-default text-md font-normal gap-2">
                        <Label className="mb-2">Choose educational position.</Label>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="student" id="student" />
                            <Label htmlFor="student">Student</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="teacher" id="teacher" />
                            <Label htmlFor="teacher">Teacher</Label>
                        </div>
                    </RadioGroup>
                    <input type="submit" className="font-bold hover:cursor-pointer" value="Submit preferences" />
                </form>

            </section>
        )
    }
    return (<>
        You're all set.
    </>)
}
