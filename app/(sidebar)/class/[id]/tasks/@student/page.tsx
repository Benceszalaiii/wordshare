"use server";

import { auth } from "@/lib/auth";

export default async function Page(){
    const session = await auth();
    return (
        <div>
            <h1>Student Task Page</h1>
        </div>
    );
}