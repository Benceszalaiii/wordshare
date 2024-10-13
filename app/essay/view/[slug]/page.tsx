import { BackArrow } from "@/components/shared/icons";
import { getEssayById, getUserById } from "@/lib/db";
import { Essay } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import { countWords } from "@/lib/utils";
import { Header } from "@/components/blank";
import CommentWrapper from "@/components/commentwrapper";

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await getEssayById(params.slug);
  if (res.status !== 200) {
    return <p>Error: {res.statusText}</p>;
  }
  const essay: Essay = await res.json();
  const author = await getUserById(essay.userId);
  if (!author) {
    return <p>Author not found</p>;
  }
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
      <div className=" flex w-full flex-col gap-5 px-4 pt-8 dark:text-white md:px-32">
        <div className="space-between flex w-full flex-row gap-12">
          <div className="flex flex-row justify-start items-start">
              <Header className="rounded-xl p-3">
                <h1 className="mb-2 text-3xl font-bold">{essay.title}</h1>
                <div className="ml-2 text-neutral-600">
                  <p>
                    Created by:{" "}
                    <span className="text-neutral-500"> {author.name}</span>
                  </p>
                  <p>
                    Submitted at:{" "}
                    <span className="text-neutral-500">{createdAtReadable}</span>
                  </p>
                  <p>
                    Task: <span className="text-neutral-500">-</span>
                  </p>
                  <p>Word count: <span className="text-neutral-500">{wordcount} / 240  (hard-coded number, Work in Progress to make it task based)</span></p>
                  <p>
                    AI possibility:{" "}
                    <span className="italic text-neutral-500">
                      (Upcoming feature)
                    </span>
                  </p>
                  <p className="mt-2">
                    Score: <span className="text-neutral-500">No score yet</span>
                  </p>
                </div>
              </Header>
          </div>
        </div>
        <p className="space-y-2 whitespace-pre-wrap text-justify font-serif leading-relaxed px-4 md:text-lg text-neutral-700 dark:text-neutral-300">
          {essay.content}
        </p>
      </div>
      <CommentWrapper essayId={params.slug} />
    </>
  );
}

