"use server";

import { getClassById, getClassWithTasks } from "@/lib/db";
import { notFound } from "next/navigation";
import StudentTaskTable from '../../../../../components/task/studentoverview/component';

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
    const currentClass = await getClassWithTasks(id);
    if (!currentClass) {
        return notFound();
    }

    return (
        <div>
            <h1>{currentClass.name}</h1>
        </div>
    );
}
