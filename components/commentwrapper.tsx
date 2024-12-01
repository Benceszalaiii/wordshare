import { auth } from "@/lib/auth";
import {
    getAllRespondents,
    getCommentsByEssayId,
    uploadComment,
} from "@/lib/db";
import { User } from "@prisma/client";
import { SendIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import CommentSection from "./comments";
import { Button } from "./ui/button";

export default async function CommentWrapper({ essayId }: { essayId: string }) {
    const session = await auth();
    const user = session?.user;
    const comments = await getCommentsByEssayId(essayId);
    const respondents: User[] = await getAllRespondents(comments);
    return (
        <section className="mt-32 flex flex-col gap-4 p-4 md:mx-32 lg:mx-64">
            {session ? (
                <form
                    className="flex flex-col items-center gap-4 md:flex-row"
                    action={async (e) => {
                        "use server";
                        const content = e.get("content")?.toString();
                        const response = await uploadComment(
                            content,
                            session,
                            essayId,
                        );
                        revalidatePath(`/essay/view/${essayId}`);
                    }}
                >
                    <textarea
                        required
                        minLength={2}
                        maxLength={500}
                        className="min-h-32 w-full resize-none rounded-lg border dark:border-sky-500 dark:bg-dark"
                        name="content"
                        placeholder="Start writing a comment here..."
                    ></textarea>
                    <Button
                        variant={"secondary"}
                        type="submit"
                        className="h-full"
                    >
                        <SendIcon className="h-6 w-6" />
                        Submit
                    </Button>
                </form>
            ) : (
                <></>
            )}{" "}
            <CommentSection
                comments={comments}
                respondents={respondents}
                session={session}
            />
        </section>
    );
}
