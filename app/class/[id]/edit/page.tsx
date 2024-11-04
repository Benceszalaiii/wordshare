"use server";
import { CropperComponent } from "@/components/image/image-selector";
import { getClassById } from "@/lib/db";
import { BannerCropperComponent } from "../../../../components/image/banner-selector";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function Page({ params }: { params: { id: string } }) {
  const currentClass = await getClassById(params.id);
  if (!currentClass) {
    return notFound();
  }
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const isOwneer = user?.id === currentClass?.teacherUserId;
  if (!session){

  }
  return (
    <section className="flex flex-col items-start justify-center gap-4">
      <h1 className="text-2xl w-full text-center font-bold">Edit {currentClass?.name}</h1>
      <div
        about="Image Section"
        className="mt-8 flex w-full flex-grow flex-col items-center justify-evenly md:flex-row"
      >
        <div
          about="Icon"
          className="flex flex-col items-center justify-center gap-4"
        >
            <CropperComponent classId={params.id} />
            <h2 className="text-lg font-semibold">Change icon</h2>
        </div>
        <div
          about="Banner"
          className="flex flex-col items-center justify-center gap-4"
        >
         <BannerCropperComponent
              classId={currentClass.id}
              key={currentClass.id}
            />
          <h2 className="text-lg font-semibold">Change banner</h2>
        </div>
      </div>
    </section>
  );
}
