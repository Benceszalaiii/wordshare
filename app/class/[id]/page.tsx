import ClassLegend from "@/components/class/legend";
import { BackArrow } from "@/components/shared/icons";
import { getClassById } from "@/lib/db";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return notFound();
  }
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4">
        <ClassLegend canEdit={true} currentClass={currentClass} />
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
        url: `https://www.wordshare.tech/class/${params.id}`,
        images:
          "https://www.wordshare.tech/opengraph?title=Join%20a%20class%20on%20WordShare!&description=Learn%20more%20about%20languages%20and%20prepare%20for%20your%20exam%20with%20WordShare",
      },
    };
  }
  const codetolanguage = [
    { code: "en", language: "English" },
    { code: "hu", language: "Hungarian" },
    { code: "de", language: "German" },
  ];
  const title = currentClass?.name || "Class";
  return {
    title: title,
    description:
      currentClass?.description ||
      `Join ${currentClass.name} to learn more about ${
        codetolanguage.find((x) => x.code === currentClass.language)
          ?.language || "English"
      }`,
    openGraph: {
      type: "website",
      title: title,
      description:
        currentClass?.description ||
        `Join ${currentClass?.name} to learn more about ${currentClass?.language}`,
      url: `https://www.wordshare.tech/class/${params.id}`,
      images:
        `https://www.wordshare.tech/class/banners/${currentClass.id}` ||
        "https://www.wordshare.tech/opengraph?title=Join%20a%20class%20on%20WordShare!&description=Learn%20more%20about%20languages%20and%20prepare%20for%20your%20exam%20with%20WordShare",
    },
  };
}
