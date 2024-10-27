"use client";
import { Class } from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Icon } from "./images";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { toast } from "sonner";
import LeaveClassButton from "./leavebutton";

export default function ClassLegend({
  currentClass,
  canEdit,
}: {
  currentClass: Class;
  canEdit?: boolean | null;
}) {
  const editable = canEdit ?? false;
  return (
    <>
      <section className="px-4">
        {editable ? (
          <aside className="flex w-full flex-row items-end justify-end gap-6 text-gray-800 dark:text-gray-200">
            <Link href={`/class/${currentClass.id}/invite`}>
              Invite students
            </Link>
            <Link className="pr-2" href={`/class/${currentClass.id}/edit`}>
              Edit
            </Link>
          </aside>
        ) : (
          <aside className="flex w-full flex-row items-end justify-end gap-6">
            <LeaveClassButton classId={currentClass.id} />
          </aside>
        )}
            <Image
              about="Banner"
              className="w-full rounded-xl object-cover my-4"
              src={`/class/banners/${currentClass.id}`}
              alt="Class banner"
              width={410}
              height={160}
            />
        <div className="flex w-full px-4 flex-col justify-start gap-2">
          <h1 className=" text-3xl font-bold">{currentClass.name}</h1>
          <p className="ml-2 text-gray-800 dark:text-gray-400">
            {currentClass.description}
          </p>
        </div>
      </section>
    </>
  );
}
