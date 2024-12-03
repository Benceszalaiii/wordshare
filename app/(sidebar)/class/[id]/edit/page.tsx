"use server";
import { CropperComponent } from "@/components/image/image-selector";
import { auth } from "@/lib/auth";
import { getClassById } from "@/lib/db";
import { notFound } from "next/navigation";
import { BannerCropperComponent } from "@/components/image/banner-selector";

type Params = Promise<{id: string}>;

export default async function Page({ params }: { params: Params }) {
    const { id } = await params;
    const currentClass = await getClassById(id);
    if (!currentClass) {
        return notFound();
    }
    const session = await auth();
    const user = session?.user;
    const isOwneer = user?.id === currentClass?.teacherUserId;
    if (!session) {
    }
    return (
        <section className="flex flex-col items-start justify-center gap-4">
            <h1 className="w-full text-center text-2xl font-bold">
                Edit {currentClass?.name}
            </h1>
            <div
                about="Image Section"
                className="mt-8 flex w-full flex-grow flex-col items-center justify-evenly md:flex-row"
            >
                <div
                    about="Icon"
                    className="flex flex-col items-center justify-center gap-4"
                >
                    <CropperComponent classId={id} />
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
