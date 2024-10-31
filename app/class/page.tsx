import { SignInButton } from "@/components/shared/buttons";
import {
  getClassByStudentSession,
  getClassesByTeacherUser,
  getUserById,
} from "@/lib/db";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import StudentClassList from "@/components/class/student";
import TeacherClassList from "@/components/class/teacher";
import { Header } from "@/components/blank";
import Link from "next/link";
import { getUserElevation } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { notAuthorized } from "@/components/auth";

export const metadata = {
    title: "Classes"
}

export default async function Page() {
  const auth = await getServerSession(authOptions);
  const user = auth?.user;
  if (!user?.id) {
    return notAuthorized("Classes");
  }
  const dbUser = await getUserById(user.id);
  const elevation = getUserElevation(dbUser?.role);
  if (!dbUser) {
    return (
      <h1>
        User not found in database. <br /> This might be a problem from our
        side.
      </h1>
    );
  }
  if (elevation === 0){
    return (
      <section className="flex flex-col gap-4 justify-center items-center">
          <h1 className="text-lg">Your account is not set up.</h1>
          <p className="text-sm">Please set your role</p>
          <Button asChild variant={"outline"}><Link href={'/quickstart'}>Set up account</Link></Button>
      </section>
    )
  }
  if (elevation === 1) {
    const studentClasses = await getClassByStudentSession(auth);
    return (
      <section className="flex flex-col gap-4">
        <Header className="flex flex-row flex-wrap items-center justify-start md:flex-nowrap">
          <h1 className="ml-4 text-2xl font-bold md:ml-24">Classes</h1>
        </Header>
        <StudentClassList classes={studentClasses} />
      </section>
    );
  }
  if (elevation >= 2) {
    const classes = await getClassesByTeacherUser(dbUser.id);
    return (
      <section className="flex flex-col gap-4">
        <Header className="px-4 max-w-full md:px-24 flex w-full flex-row flex-wrap items-center justify-between md:flex-nowrap">
          <h1 className=" text-2xl font-bold">Classes</h1>
          <Link href={`/class/create`} className="hover:underline hover:text-gray-700 hover:dark:text-gray-300 pr-4">Create class</Link>
        </Header>
        <TeacherClassList classes={classes} />
      </section>
    );
  }
}
