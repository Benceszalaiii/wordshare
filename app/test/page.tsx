"use server";
import { Button, styleVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import TextRevealByWord from "@/components/ui/text-reveal";
import UserHoverCard from "@/components/user/user-hover";
import ConnectionGame from "@/components/wordplay/connectiongame";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/db";

export default async function Page() {
    // const essays = await getEssaysForUser();
    const user = await auth();
    const dbUser = await getUserById(user?.user.id);
    return (
        <section className="flex flex-col items-center justify-center gap-4 space-y-4 p-4">
            <p>Test page for development purposes</p>
            <Label>Button styles</Label>
            <div className="grid grid-cols-2 gap-16 md:grid-cols-7">
                {Object.keys(styleVariants.variant).map((v) => (
                    <Button
                        variant={
                            v as
                                | "default"
                                | "success"
                                | "destructive"
                                | "outline"
                                | "secondary"
                                | "ghost"
                                | "link"
                                | "expandIcon"
                                | "ringHover"
                                | "shine"
                                | "gooeyRight"
                                | "gooeyLeft"
                                | "linkHover1"
                                | "linkHover2"
                                | null
                                | undefined
                        }
                        key={v}
                    >
                        {v}
                    </Button>
                ))}
            </div>
            
            <Label>User Hover Card test</Label>
            {dbUser && <UserHoverCard user={dbUser} />}
            <Label>Connection game test</Label>
            <ConnectionGame
                allWords={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                goodWords={["2", "4", "6"]}
            />
            <TextRevealByWord text="This is a test of the text reveal component" />
            <div className="min-h-screen w-full rounded-lg" />
        </section>
    );
}
