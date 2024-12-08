"use server";
import { Button, styleVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TextRevealByWord from "@/components/ui/text-reveal";
import UserHoverCard from "@/components/user/user-hover";
import ConnectionGame from "@/components/wordplay/connectiongame";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/db";
import { AnimatedGradientText } from '../../components/ui/gradient-text';
import RandomTopic from '../../components/random-topic';

export default async function Page() {
    // const essays = await getEssaysForUser();
    const user = await auth();
    const dbUser = await getUserById(user?.user.id);
    return (
        <section className="flex flex-col items-center justify-center gap-4 space-y-4 p-4">
            <p>Test page for development purposes</p>
            {/* <Label>Connection game test</Label>
            <ConnectionGame
                allWords={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                goodWords={["2", "4", "6"]}
            /> */}
            <RandomTopic />
            <TextRevealByWord text="This is a test of the text reveal component" />
            <div className="min-h-screen w-full rounded-lg" />
        </section>
    );
}
