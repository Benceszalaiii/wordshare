import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
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
