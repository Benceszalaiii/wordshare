"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ClassLegend from "@/components/class/legend";
import { getClassById, getUserById, isOwnClass } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SignInButton } from '../../../components/shared/buttons';
import { langParse } from "@/lib/utils";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session){
    return (
      <section className="flex flex-col justify-center items-center gap-4 w-full">
        <h1>Try logging in first.</h1>
        <SignInButton session={session}/>
      </section>
    )
  }
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return notFound();
  }
  const dbUser = await getUserById(session.user.id);
  if (!dbUser){
    return (
      <section className="flex flex-col justify-center items-center gap-4 w-full">
        <h1>Try logging in first.</h1>
        <SignInButton session={session}/>
      </section>
    )
  }
  const canEdit = await isOwnClass(session.user.id, currentClass.id) || dbUser.role === "admin";
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4">
        <ClassLegend canEdit={canEdit} currentClass={currentClass} />
      </section>
    </>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return {
      title: "Class not found",
      description: "The class you are looking for does not exist",
      openGraph: {
        type: "website",
        title: "Join a class on WordShare!",
        description:
          "Learn more about languages and prepare for your exam with WordShare",
        url: `https://www.wordshare.tech/class/${params.id}`
    }
  }
}

  const title = currentClass?.name || "Class";
  return {
    title: title,
    description:
      currentClass?.description ||
      `Join ${currentClass.name} to learn more about ${
        langParse(currentClass.language) || "English"
      }`,
    openGraph: {
      type: "website",
      title: title,
      description:
        currentClass?.description ||
        `Join ${currentClass?.name} to learn more about ${langParse(currentClass?.language || "en")}`,
      url: `https://www.wordshare.tech/class/${params.id}`,
      images:
        `https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/banner`
    },
  };
}
