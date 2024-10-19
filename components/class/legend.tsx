import { Class } from "@prisma/client";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Icon } from "./images";


export default function ClassLegend({ currentClass }: { currentClass: Class }) {
  return (
    <>
      <div className="flex w-full max-w-2xl flex-col gap-2 rounded-xl px-4 md:px-0">
        <div className="relative flex h-48 w-full max-w-2xl flex-shrink-0 flex-col gap-2 rounded-xl px-4 md:px-0 ">
          <div className="h-full w-full relative rounded-xl">
            <Image
              about="Banner"
              className=" h-full w-full rounded-xl object-cover opacity-75 blur-sm"
              src={`/class/banners/${currentClass.id}`}
              alt=""
              fill
            />
          </div>
          <div className="absolute flex h-full w-full items-center justify-end p-4">
            <Icon
              classId={currentClass.id}
              className="h-24 w-24 rounded-full"
            />
          </div>
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
