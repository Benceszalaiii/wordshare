"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ClassLegend from "@/components/class/legend";
import { TimelineSkeleton } from "@/components/class/loading-components";
import NoAuthClassPage from "@/components/class/no-auth";
import { QuickCards } from "@/components/class/quickcards";
import ClassTimeline from "@/components/class/timeline";
import { getClassById, getUserById, isOwnClass, isStudentofClass } from "@/lib/db";
import { langParse } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBannerUrlWithFallback } from "../actions";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return notFound();
  }
  const dbUser = await getUserById(session?.user.id);
  const bannerUrl = await getBannerUrlWithFallback("banner", currentClass.id);
  if (!dbUser){
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <NoAuthClassPage bannerUrl={bannerUrl} currentClass={currentClass} />
      </section>
    );
  }
  const canEdit = await isOwnClass(dbUser.id, currentClass.id) || dbUser.role === "admin";
  const isStudent = await isStudentofClass(currentClass.id, dbUser.id);
  if (!isStudent && !canEdit) {
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <NoAuthClassPage bannerUrl={bannerUrl} currentClass={currentClass} />
      </section>
    )
  }
return (
    <section className="flex flex-col items-center">
        <ClassLegend bannerUrl={bannerUrl} canEdit={canEdit} currentClass={currentClass} />
        <QuickCards currentClassName={currentClass.name} classId={currentClass.id} auth={canEdit ? "teacher" : "student"} />
        <Suspense fallback={<TimelineSkeleton />}>
          <ClassTimeline currentClass={currentClass} />
        </Suspense>
    </section>
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
