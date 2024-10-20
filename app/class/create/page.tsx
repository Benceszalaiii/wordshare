import { getServerSession } from "next-auth";
import CreateForm from "@/components/class/createform";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";
import { getTeacher, getUserById } from "@/lib/db";
import Link from "next/link";
import { getUserElevation } from "@/lib/utils";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
        <h1>You need to be signed in to access this page.</h1>
        <SignInButton session={session} />
      </div>
    );
  }
  const dbUser = await getUserById(session.user.id);
  const elevation = getUserElevation(dbUser?.role);
  if (!dbUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>You need to be signed in to access this page.</h1>
        <SignInButton session={session} />
      </div>
    );
  }
  if ((elevation < 2)) {
    return (
      <section className="flex flex-col gap-4 items-center justify-center mt-24">
        <h1>You need to be a teacher to access this page.</h1>
        <p>To join a class, navigate to <Link href={"/class/join"} className="underline">your invitations</Link></p>
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
    )
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
