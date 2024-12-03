"use server";

import { getClassById } from "@/lib/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;
type searchParams = Promise<{ mode: string | undefined }>;
export default async function Page({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: searchParams;
}) {
    const { id } = await params;
    const { mode } = await searchParams;
    const currentClass = await getClassById(id);
    if (!currentClass) {
        return notFound();
    }
    return (
        <div>
            <h1>{currentClass.name}</h1>
        </div>
    );
}
