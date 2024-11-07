import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notAuthorized } from "@/components/auth";
import CreateForm from "@/components/class/createform";
import { getTeacher, getUserById } from "@/lib/db";
import { getUserElevation } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
    const session = await getServerSession(authOptions);
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
                <h1>You need to be a teacher to access this page.</h1>
                <p>
                    To join a class, navigate to{" "}
                    <Link href={"/class/join"} className="underline">
                        your invitations
                    </Link>
                </p>
            </section>
        );
    }
    const teacher = await getTeacher(dbUser.id);
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
