"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { notAuthorized } from "@/components/auth";
import { AlertWrongAccount } from "@/components/invites/alert";
import InviteSection from "@/components/invites/section";
import { SignInButton } from "@/components/shared/buttons";
import { getInvites, inviteExists } from "@/lib/db";
import { getServerSession } from "next-auth";

const metadata = {
    title: "Invites",
    description: "View and manage your invitations",
    lastModified: new Date(),
};

export default async function Page({
    params,
}: {
    params: { Id: string | null };
}) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return notAuthorized("invites");
    }
    const invites = await getInvites(session.user.id);
    console.group("Invites for ", session.user.email);
    console.table(invites);
    console.groupEnd();
    const inviteId = params?.Id ? params.Id[0] : null;

    if (!inviteId) {
        return (
            <section className="flex h-full w-full flex-col pl-4 md:pl-32">
                <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">
                    Invites
                </h1>
                <InviteSection active={null} invites={invites} />
            </section>
        );
    }
    if (invites?.find((x) => x.id === inviteId)){
        console.info("User accessed their invite");
        return (
            <section className="flex h-full w-full flex-col pl-4 md:pl-32">
                <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">Invites</h1>
                <InviteSection active={inviteId} invites={invites} />
            </section>
        );
    }
    const exists = await inviteExists(inviteId);
    if (exists) {
        console.info("User tried to access an invite that isnt theirs");
        return (
            <section className="flex h-full w-full flex-col pl-4 md:pl-32">
                <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">
                    Invites
                </h1>
                <AlertWrongAccount  />
                <InviteSection active={null} invites={invites} />
            </section>
        );
    }
    return (
        <section className="flex h-full w-full flex-col pl-4 md:pl-32">
            <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">Invites</h1>
            <p>Invite not found...</p>
        </section>
    );
}

export async function generateMetadata() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return metadata;
    }
    const invites = await getInvites(session.user.id);
    if (!invites || invites.length === 0) {
        return metadata;
    }
    return {
        ...metadata,
        title: `Invites (${invites.length})`,
    };
}
