"use server";
import { BackArrow } from "@/components/shared/icons";
import { getEssayById, getUserById } from "@/lib/db";
import { Essay } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import { countWords } from "@/lib/utils";
import { Header } from "@/components/blank";
import CommentWrapper from "@/components/commentwrapper";
import { ScoreDrawerWrapper } from "@/components/essay/score";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { slug: string } }) {
    const essay = await getEssayById(params.slug);
    if (!essay) {
        return <p>Essay not found</p>;
    }
    const session = await getServerSession(authOptions);
    const dbUser = await getUserById(session?.user.id);
    const author = await getUserById(essay.userId);
    if (!author) {
        return <p>Author not found</p>;
    }
    const ownEssay = dbUser?.id === essay.userId;
    const canEdit = dbUser?.role === "admin" || (dbUser?.role === "teacher" && dbUser?.teacherVerified);
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
    const wordcount = countWords(essay.content);
    return (
        <>
            <div className=" flex w-full flex-col gap-5 px-4 dark:text-white md:px-32">
                <div className="space-between flex w-full flex-row gap-12">
                    <div className="flex flex-row items-start justify-start">
                        <Header className="space-y-2 rounded-xl p-3">
                            <h1 className="mb-2 text-3xl font-bold">
                                {essay.title}
                            </h1>
                            <div className="ml-2 text-neutral-600">
                                <p>
                                    Created by:{" "}
                                    <span className="text-neutral-500">
                                        {" "}
                                        {author.name}
                                    </span>
                                </p>
                                <p>
                                    Submitted at:{" "}
                                    <span className="text-neutral-500">
                                        {createdAtReadable}
                                    </span>
                                </p>
                                <p>
                                    Task:{" "}
                                    <span className="text-neutral-500">-</span>
                                </p>
                                <p>
                                    Word count:{" "}
                                    <span className="text-neutral-500">
                                        {wordcount} / 240 (hard-coded number,
                                        Work in Progress to make it task based)
                                    </span>
                                </p>
                                <p className="mt-2">
                                    Score:{" "}
                                    <span className="text-neutral-500">
                                        No score yet
                                    </span>
                                </p>
                            </div>
                            {canEdit && (
                                <ScoreDrawerWrapper writerId={essay.userId}>
                                    <Button variant={"ghost"}>Score</Button>
                                </ScoreDrawerWrapper>
                            )}
                        </Header>
                    </div>
                </div>
                <p className="space-y-2 whitespace-pre-wrap px-4 text-justify font-serif leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-lg">
                    {essay.content}
                </p>
            </div>
            <CommentWrapper essayId={params.slug} />
        </>
    );
}
