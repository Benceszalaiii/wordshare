"use server";
import { getEssayById, getSchoolById, getUserById } from "@/lib/db";

import { Header } from "@/components/blank";
import CommentWrapper from "@/components/commentwrapper";
import RequestWrapper from "@/components/essay/requestwrapper";
import { ScoreDrawerWrapper } from "@/components/essay/score";
import { Button } from "@/components/ui/button";
import UserHoverCard from "@/components/user/user-hover";
import { auth } from "@/lib/auth";
import { getEssayContent } from "@/lib/supabase";
import { countWords } from "@/lib/utils";

type Params = Promise<{ essayId: string }>;

export default async function Page({ params }: { params: Params }) {
    const { essayId } = await params;
    const essay = await getEssayById(essayId);
    if (!essay) {
        return <p>Essay not found</p>;
    }
    const author = await getUserById(essay.userId);
    if (!author) {
        return <p>Author not found</p>;
    }
    const content = await getEssayContent(essayId, author.id);
    const session = await auth();
    const dbUser = await getUserById(session?.user.id);
    const ownEssay = dbUser?.id === essay.userId;
    const canScore = dbUser?.role === "admin"; //! subject to change
    const createdAtReadable = new Date(essay.createdAt).toLocaleDateString(
        "en-GB",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        },
    );
    const authorSchool = await getSchoolById(author.schoolId);
    const wordcount = countWords(content || "");
    return (
        <>
            <div className="flex w-full flex-col gap-5 px-4 dark:text-white md:px-32">
                <div className="space-between flex w-full flex-row gap-12">
                    <div className="flex flex-row items-start justify-start">
                        <Header className="space-y-4 rounded-xl p-3">
                            <h1 className="mb-2 text-3xl font-bold">
                                {essay.title}
                            </h1>
                            <div className="ml-2 leading-loose text-neutral-500">
                                Created by:{" "}
                                <UserHoverCard
                                    schoolName={
                                        authorSchool?.name || "no school"
                                    }
                                    className="pb-0 pl-0 text-start text-neutral-500"
                                    variant={{ variant: "link" }}
                                    user={author}
                                />
                                <p>
                                    Written:{" "}
                                    <span className="text-neutral-500">
                                        {createdAtReadable}
                                    </span>
                                </p>
                                <p>
                                    Word Count:{" "}
                                    <span className="text-neutral-500">
                                        {wordcount}
                                    </span>
                                </p>
                                <p className="">
                                    Score:{" "}
                                    <span className="text-neutral-500">
                                        No score yet
                                    </span>
                                </p>
                            </div>
                            {canScore && (
                                <ScoreDrawerWrapper writerId={essay.userId}>
                                    <Button variant={"ghost"}>
                                        Grade essay
                                    </Button>
                                </ScoreDrawerWrapper>
                            )}
                            {ownEssay && (
                                <RequestWrapper essayId={essayId}>
                                    <Button variant={"ghost"}>
                                        Request Review
                                    </Button>
                                </RequestWrapper>
                            )}
                        </Header>
                    </div>
                </div>
                <p className="space-y-2 whitespace-pre-wrap px-4 text-justify font-serif leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg">
                    {content}
                </p>
            </div>
            <CommentWrapper essayId={essayId} />
        </>
    );
}
