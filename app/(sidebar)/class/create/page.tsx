import { notAuthorized } from "@/components/auth";
import CreateForm from "@/components/class/createform";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import { getUserElevation } from "@/lib/utils";
import Link from "next/link";

export default async function Page() {
    const session = await auth();
    if (!session) {
        return notAuthorized("the class creation page");
    }
    const dbUser = await getUserById(session.user.id);
    const elevation = getUserElevation(dbUser?.role);
    if (!dbUser) {
        return notAuthorized("the class creation page");
    }
    if (elevation < 2) {
        return (
            <section className="mt-24 flex flex-col items-center justify-center gap-4">
                <h1>You need to be a teacher to create classes.</h1>
                <p>
                    To join a class, navigate to{" "}
                    <Link href={"/invites"} className="underline">
                        your invitations
                    </Link>
                </p>
            </section>
        );
    }
    const teacher = await getUserById(dbUser.id);
    if (!teacher && dbUser.role !== "admin") {
        return (
            <section className="flex flex-col items-center justify-center gap-4">
                <h1>You are not a verified teacher.</h1>
                <p>Once you are verified, you can create a class.</p>
                <p>If you think it&apos;s an issue on our side, contact us.</p>
            </section>
        );
    }
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-2xl font-semibold">Create class</h1>
                <CreateForm />
            </section>
        </>
    );
}
