"use server";

import { notAuthorized } from "@/components/auth";
import { AlertWrongAccount } from "@/components/invites/alert";
import InviteSection from "@/components/invites/section";
import { auth } from "@/lib/auth";
import { getInvites, inviteExists } from "@/lib/db";
const metadata = {
    title: "Invites",
    description: "View and manage your invitations",
    lastModified: new Date(),
};

type Params = Promise<{ Id: string | null }>;

export default async function Page({
    params,
}: {
    params: Params;
}) {
    const { Id} = await params;
    const session = await auth();
    if (!session) {
        return notAuthorized("invites");
    }
    const invites = await getInvites(session.user.id);

    const inviteId = Id ? Id[0] : null;

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
    if (invites?.find((x) => x.id === inviteId)) {
        return (
            <section className="flex h-full w-full flex-col pl-4 md:pl-32">
                <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">
                    Invites
                </h1>
                <InviteSection active={inviteId} invites={invites} />
            </section>
        );
    }
    const exists = await inviteExists(inviteId);
    if (exists) {
        return (
            <section className="flex h-full w-full flex-col pl-4 md:pl-32">
                <h1 className="m-4 mb-8 ml-0 text-2xl font-semibold">
                    Invites
                </h1>
                <AlertWrongAccount />
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
    const session = await auth();
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
