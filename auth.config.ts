import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
    interface Session {
        user: {
            /** The user's database id. */
            id: string;
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"];
    }
}



export default {
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        newUser: "/quickstart",
    },
    theme: { brandColor: "#9333ea" },
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id;
            return session;
        },
    },
} satisfies NextAuthConfig;
