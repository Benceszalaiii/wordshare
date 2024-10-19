import ClassLegend from "@/components/class/legend";
import { BackArrow } from "@/components/shared/icons";
import { getClassById } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return notFound();
  }
  return (
    <>
      <Link
        href={"/class"}
        className="relative top-0 flex flex-row items-center justify-start text-gray-700 dark:text-gray-500"
      >
        <BackArrow className="h-4 w-4" />
        <p>Go Back</p>
      </Link>
      <section className="flex flex-col items-center justify-center gap-4">
        <ClassLegend currentClass={currentClass} />
      </section>
    </>
  );
}
