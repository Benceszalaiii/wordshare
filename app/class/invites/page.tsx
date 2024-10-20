"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import InviteSection from "@/components/invites/section";
import { SignInButton } from "@/components/shared/buttons";
import { getInvites } from "@/lib/db";
import { getServerSession } from "next-auth";

const metadata = {
  title: "Invitations",
  description: "View and manage your invitations",
  lastModified: new Date(),
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>You must be signed in to receive invites.</h1>
        <SignInButton session={session} />
      </div>
    );
  }
  const invites = await getInvites(session.user.id);
  if (!invites) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1>No invites found.</h1>
        <p>Check back later.</p>
      </div>
    );
  }
  return (
    <section className="flex h-full w-full flex-col">
      <h1 className="m-4 mb-8 text-2xl font-semibold">Invites</h1>
      <InviteSection invites={invites} />
    </section>
  );
}

export async function generateMetadata() {
  return metadata;
}
