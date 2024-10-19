import ClassLegend from "@/components/class/legend";
import { BackArrow } from "@/components/shared/icons";
import { getClassById } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { title } from "process";

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

export async function generateMetadata({params}: {params: {id: string}}){
  const currentClass = await getClassById(params.id);
  const title = currentClass?.name || "Class";
  return {
      title: title,
    }
}