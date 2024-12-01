"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Class } from "@prisma/client";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import ClassCard from "../class/card";
import CursorWrapper from "./cursor-wrapper";

export default function MutualClassSection({
    currentUserClasses,
    UserClasses,
    userName,
    loggedIn,
    own
}: {
    currentUserClasses: Class[];
    UserClasses: Class[];
    userName: string;
    loggedIn: boolean;
    own: boolean
}) {
    if (own){
        return (
            <section className="flex flex-col w-full max-w-screen-md gap-2 p-4 mt-8 border rounded-lg border-border">
            <h2 className="mb-4 text-xl font-semibold ">Mutual classes</h2>
            <p className="text-gray-500">
                Your mutual classes with your profile visitors will appear here for them
            </p>
        </section>
        )
    }
    if (!loggedIn) {
        return (
            <section className="flex flex-col w-full max-w-screen-md gap-2 p-4 mt-8 border rounded-lg border-border">
                <h2 className="mb-4 text-xl font-semibold ">Mutual classes</h2>
                <p className="text-gray-500">
                    You need to log in to see your mutual classes
                </p>
            </section>
        );
    }
    const mutualClasses = currentUserClasses.filter((cls) =>
        UserClasses.some((ucls) => ucls.id === cls.id),
    );
    return (
        <CursorWrapper cursorColor="#2563eb" title="Mutual classes" className="flex flex-col w-full max-w-screen-md gap-2 p-4 mt-8 border rounded-lg border-border">
            {mutualClasses.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 place-content-center md:grid-cols-3">
                    {mutualClasses
                        .slice(
                            Math.max(0, mutualClasses.length - 3),
                            mutualClasses.length,
                        )
                        .map((cls) => {
                            return (
                                <ClassCard currentClass={cls} key={cls.id} />
                            );
                        })}
                </div>
            ) : (
                <p className="w-full text-neutral-500">
                    You have no classes in common with {userName}
                </p>
            )}
        </CursorWrapper>
    );
}
