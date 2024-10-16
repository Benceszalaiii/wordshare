import { getServerSession } from "next-auth";
import CreateForm from "@/components/class/createform";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";
import { getTeacher, getUserById } from "@/lib/db";
import Link from "next/link";

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
  if (!dbUser) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>You need to be signed in to access this page.</h1>
        <SignInButton session={session} />
      </div>
    );
  }
  if ((dbUser.role !== "teacher" && dbUser.role !== "admin") || !dbUser.role) {
    return (
      <>
        <h1>You need to be a teacher to access this page.</h1>
        <p>To join a class, navigate to <Link href={"/class/join"}>Join Class</Link></p>
      </>
    );
  }
  const teacher = await getTeacher(dbUser.id);
  if (!teacher && dbUser.role !== "admin") {
    return (
        <>
        <h1>You are not a verified teacher.</h1>
        <p>Once you are verified, you can create a class.</p>
        <p>If you think it&apos;s an issue on our side, contact us.</p>
        </>
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
