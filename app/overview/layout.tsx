import NextAuth, { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { signIn } from "next-auth/react";
import { SignInButton } from '../../components/shared/buttons';

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
        <div className="text-dark dark:text-light">Please sign in to view this page.</div>
        <SignInButton session={session} />
      </div>
    );
  }
  return (
    <>
      <div className="z-10 text-light">{children}</div>
    </>
  );
}
