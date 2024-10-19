import { Class } from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Icon } from "./images";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

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
      <div className="flex w-full max-w-2xl flex-col gap-2 rounded-xl px-4 md:px-0">
        {editable ? (
                <Link className="text-gray-800 dark:text-gray-200 flex flex-row w-full justify-end items-center" href={`/class/${currentClass.id}/edit`}>
                  <Edit2Icon className="h-6 w-6" />
                </Link>
            ) : null}
        <div className="relative flex h-32 w-full max-w-2xl flex-shrink-0 flex-col gap-2 rounded-xl px-4 md:h-48 md:px-0 ">
          <div className="relative aspect-[18/9] w-full rounded-xl flex flex-row items-center justify-center">
            <Image
              about="Banner"
              className="w-full rounded-xl object-cover object-center opacity-75"
              src={`/class/banners/${currentClass.id}`}
              alt=""
              fill
            />
          </div>
          <div className="absolute flex h-full w-full items-center justify-end p-4"></div>
        </div>
        <div className="flex w-full flex-col justify-start gap-2">
          <h1 className=" text-3xl font-bold">{currentClass.name}</h1>
          <p className="ml-2 text-gray-800 dark:text-gray-400">
            {currentClass.description}
          </p>
        </div>
      </div>
    </>
  );
}
