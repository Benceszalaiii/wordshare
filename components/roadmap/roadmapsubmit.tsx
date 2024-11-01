"use server";

import { uploadRoadmap } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function AddRoadMap2({ className }: { className?: string }) {
    return (
        <li className={"mb-10 ms-4 w-full"} suppressHydrationWarning>
            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-main-600 dark:border-main-900 dark:bg-main-700"></div>
            <form
                suppressHydrationWarning
                className={"flex flex-col items-start " + className}
                action={async (e) => {
                    "use server";
                    const title = e.get("title")?.toString() || "";
                    const content = e.get("content")?.toString() || "";
                    const response = await uploadRoadmap(title, content);
                    revalidatePath("/roadmap");
                }}
            >
                <input
                    suppressHydrationWarning
                    required
                    minLength={4}
                    maxLength={50}
                    name="title"
                    placeholder="Title"
                    className="m-0 -ml-5 mt-0 rounded-none border-x-0 border-b border-t-0 bg-transparent p-0 text-lg font-semibold text-gray-900 outline-0 ring-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-transparent dark:text-white"
                />
                <textarea
                    suppressHydrationWarning
                    required
                    maxLength={200}
                    minLength={10}
                    name="content"
                    placeholder="Start writing the description here..."
                    className="m-0 -ml-5 mb-4 mt-4 w-full resize-none whitespace-pre-wrap text-wrap rounded-none border-x-0 border-b border-t-0 bg-transparent p-0 text-base font-normal text-gray-500 outline-0 ring-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-transparent dark:text-gray-400"
                />
                <button suppressHydrationWarning type="submit">
                    Submit
                </button>
            </form>
        </li>
    );
}
