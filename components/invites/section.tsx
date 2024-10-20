"use server";

import { Invite } from "@prisma/client";
import { InviteCard } from "./card";

export default async function InviteSection({invites}: {invites: Invite[]}){
    return (
        <section className="flex flex-row justify-center md:justify-start flex-wrap w-full h-full gap-4 mb-8">
        {invites.map(invite => (
            <InviteCard invite={invite} key={invite.id} />
        ))}
        </section>
    )
}