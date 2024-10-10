import NextAuth, { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/options";
import React from "react";
import { SignInButton } from "../../components/shared/buttons";
import { SideBar } from "@/components/layout/sidebar";

export const metadata = {
  title: "Overview",
};
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
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
      <SideBar />
      <section className=" z-10">{children}</section>
    </>
  );
}
