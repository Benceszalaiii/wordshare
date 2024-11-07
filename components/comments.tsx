"use client";
import { Comment, User } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";

export default function CommentSection({
    comments,
    respondents,
    session,
}: {
    comments: Comment[];
    respondents: User[];
    session: Session | null;
}) {
    return (
        <>
            {comments.map((comment) => {
                const author = respondents.find(
                    (user) => user.id === comment.userId,
                );
                if (!author) {
                    return (
                        <div className="italic" key={comment.id}>
                            Deleted comment
                        </div>
                    );
                }
                const avatar = author.image
                    ? author.image
                    : "https://via.placeholder.com/150";
                return (
                    <div key={comment.id}>
                        <hr className="mb-4 border-neutral-800" />
                        <div className="mb-4 flex flex-row items-center gap-2">
                            <Image
                                src={avatar}
                                width={36}
                                height={36}
                                className="rounded-full"
                                alt="Avatar"
                            />
                            <h3>{author.name}</h3>
                            <p className="text-neutral-700">
                                {comment.createdAt.toLocaleString("en-GB", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                    weekday: "long",
                                })}
                            </p>
                        </div>
                        <p className="ml-8 truncate text-wrap">
                            {comment.content}
                        </p>
                    </div>
                );
            })}
        </>
    );
}
