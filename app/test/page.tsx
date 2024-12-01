"use server";
import SubmitTaskModal from "@/components/task/submittask";
import { Button, styleVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import ConnectionGame from "@/components/wordplay/connectiongame";
import { getEssaysForUser } from "../tasks/actions";
import UserHoverCard from "@/components/user/user-hover";
import { getUserById } from "@/lib/db";
import UserBanner from "@/components/user/banner";
import { auth } from "@/lib/auth";

export default async function Page() {
    // const essays = await getEssaysForUser();
    const user = await auth();
    const dbUser = await getUserById(user?.user.id);
    return (
        <section className="flex flex-col items-center justify-center gap-4 p-4 space-y-4">
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
            {/* <SubmitTaskModal classId="23" essays={essays}>
                <Button variant="default">Open modal</Button>
            </SubmitTaskModal> */}
            <Label>User Hover Card test</Label>
            {dbUser && <UserHoverCard user={dbUser} />}
            
            <Label>Connection game test</Label>
            <ConnectionGame
                allWords={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                goodWords={["2", "4", "6"]}
            />
            <div className="w-full min-h-screen rounded-lg" />
        </section>
    );
}
