"use server";

import { Invite } from "@prisma/client";
import { InviteCard } from "./card";
import InviteDoesntExist from "./notfound";

export default async function InviteSection({
    invites,
    active,
}: {
    invites: Invite[] | null;
    active: string | null;
}) {
    if (!invites || invites.length === 0) {
        if (active) {
            return (
                <section className="flex h-full w-full flex-col">
                    <div className="flex w-full flex-col justify-center gap-2 pl-12">
                        <p>No invites found</p>
                        <p>Check back later!</p>
                    </div>
                    <InviteDoesntExist />
                </section>
            );
        }
        return (
            <section className="flex h-full w-full flex-col">
                <div className="flex w-full flex-col justify-center gap-2 pl-12">
                    <p>No invites found</p>
                    <p>Check back later!</p>
                </div>
            </section>
        );
    }
    const hasActive =
        invites.filter((invite) => invite.id === active).length > 0;
    return (
        <section className="mb-8 flex h-full w-full flex-row flex-wrap justify-center gap-4 md:justify-start">
            {invites.map((invite) => (
                <InviteCard
                    invite={invite}
                    key={invite.id}
                    isActive={invite.id === active}
                />
            ))}
            {!hasActive && active ? <InviteDoesntExist /> : null}
        </section>
    );
}
