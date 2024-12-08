"use server";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ShineBorder } from "../ui/shine-border";
import { currentScheme } from "tailwind.config";

export default async function MainButton() {
    const session = await auth();
    const scheme = currentScheme();
    
    if (session) {
        return (
            <Link className="" href={"/overview"}>
                <ShineBorder
                    className="relative flex w-32 flex-col items-center justify-center text-foreground overflow-hidden border hover:bg-background/75 bg-background/50 bg-opacity-50 backdrop-blur-lg transition-all duration-500 hover:scale-110 md:shadow-xl"
                    color={[scheme.palette[500], scheme.palette[500], scheme.palette[600]]}
                    borderWidth={1.5}
                    borderRadius={24}
                >
                    <p>Dashboard</p>
                </ShineBorder>
            </Link>
        );
    }
    return null;
}
