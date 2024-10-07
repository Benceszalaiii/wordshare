import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  getAllRespondents,
  getCommentsByEssayId,
  uploadComment,
} from "@/lib/db";
import { User } from "@prisma/client";
import { getServerSession, Session } from "next-auth";
import { ReactNode } from "react";
import CommentSection from "./comments";
import { Button } from "./button";
import { SendIcon } from "lucide-react";
import { revalidatePath } from "next/cache";

export default async function CommentWrapper({ essayId }: { essayId: string }) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const comments = await getCommentsByEssayId(essayId);
  const respondents: User[] = await getAllRespondents(comments);
  return (
    <section className="mt-32 flex flex-col gap-4 p-4 md:mx-32 lg:mx-64">
      {session ? (
        <form
          className="flex flex-col items-center gap-4 md:flex-row"
          method="POST"
          action={async (e) => {
            "use server";
            const content = e.get("content")?.toString();
            const response = await uploadComment(content, session, essayId);
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
            type="submit"
            className="h-full border border-dashed border-neutral-400 py-4 text-neutral-400 hover:dark:border-white hover:dark:text-neutral-400"
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
