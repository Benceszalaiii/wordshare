"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notAuthorized } from "@/components/auth";
import InviteSection from "@/components/invites/section";
import { SignInButton } from "@/components/shared/buttons";
import { getInvites } from "@/lib/db";
import { getServerSession } from "next-auth";

const metadata = {
  title: "Invites",
  description: "View and manage your invitations",
  lastModified: new Date(),
};

export default async function Page({params}: {params: {classId: string | null}}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return notAuthorized("invites");
  }
  const invites = await getInvites(session.user.id);
  return (
    <section className="flex h-full w-full flex-col pl-4 md:pl-32">
      <h1 className="m-4 ml-0 mb-8 text-2xl font-semibold">Invites</h1>
      <InviteSection active={params?.classId ? params.classId[0] : null} invites={invites} />
    </section>
  );
}

export async function generateMetadata() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return metadata};
  const invites = await getInvites(session.user.id);
  if (!invites || invites.length === 0) {
    return metadata;
  }
  return {
    ...metadata,
    title: `Invites (${invites.length})`,
  };
}
