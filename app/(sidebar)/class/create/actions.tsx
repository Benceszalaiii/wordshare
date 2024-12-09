"use server";

import { createClass, getUser } from "@/lib/db";

type ClassData = {
    language: string;
    name: string;
    description: string;
}

export async function createClassAction(name: string, language: string, description: string){
    const dbUser = await getUser();
    if (dbUser?.role !== "teacher" && dbUser?.role !== "admin"){
        throw new Error("You need to be a teacher or admin to create a class.");
    }
    const createdClass = await createClass({teacherId: dbUser.id, name, language, description});
    return "Successfully created class."
}