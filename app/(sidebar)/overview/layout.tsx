import { SignInButton } from "@/components/shared/buttons";
import { auth } from "@/lib/auth";
import React from "react";
export const metadata = {
    title: "Overview",
};
export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    if (!session) {
        return (
            <div className="z-10 flex flex-col items-center justify-center gap-5">
                <div className="text-dark dark:text-light">
                    Please sign in to view this page.
                </div>
                <SignInButton session={session} />
            </div>
        );
    }
    return (
        <>
{children}
        </>
    );
}
