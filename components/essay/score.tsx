"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const scorecolors: Record<
    "0" | "50" | "100" | "150" | "200" | "250" | "300",
    string
> = {
    "0": "text-red-700",
    "50": "text-rose-500",
    "100": "text-amber-500",
    "150": "text-yellow-500",
    "200": "text-lime-500",
    "250": "text-green-500",
    "300": "text-sky-600",
};

export function ScoreDrawerWrapper({
    writerId,
    children,
}: {
    writerId: string;
    children: React.ReactNode;
}) {
    function getColor() {
        const closest = Object.keys(scorecolors)
            .map(Number)
            .reduce((prev, curr) =>
                Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev,
            );
        return scorecolors[closest.toString() as keyof typeof scorecolors];
    }
    const router = useRouter();
    const [goal, setGoal] = useState(150);
    const [bonus, setBonus] = useState(false);
    function onClick(adjustment: number) {
        setGoal(
            Math.max(
                bonus ? 50 : 0,
                Math.min(bonus ? 300 : 250, goal + adjustment),
            ),
        );
    }
    const [submitted, setSubmitted] = useState(false);

    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Score</DrawerTitle>
                </DrawerHeader>
                <div className="flex w-full flex-row items-center justify-center p-4 pb-0">
                    <div className="mb-16 flex max-w-screen-md items-center justify-center gap-16 space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(-10)}
                            disabled={goal <= (bonus ? 50 : 0)}
                        >
                            <MinusIcon className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                            <div
                                className={`text-7xl font-bold tracking-tighter transition-colors duration-500 ${getColor()}`}
                            >
                                {goal}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                WordPoints
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(10)}
                            disabled={goal >= (bonus ? 300 : 250)}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                </div>
                <div className="flex w-full justify-center">
                    <Switch
                        id="bonus"
                        checked={bonus}
                        onCheckedChange={(v) => {
                            if (v) {
                                setGoal(goal + 50);
                                setBonus(true);
                            } else {
                                setGoal(goal - 50);
                                setBonus(false);
                            }
                        }}
                        className="mx-2"
                    />
                    <Label htmlFor="bonus">Bonus points (+50)</Label>
                </div>
                <DrawerFooter className="flex w-full items-center justify-center px-8">
                    <Button
                        disabled={submitted}
                        onClick={async () => {
                            setSubmitted(true);
                            toast.promise(
                                async () => {
                                    fetch(`/api/class/points/`, {
                                        method: "POST",
                                        headers: {
                                            userId: writerId,
                                            points: goal.toString(),
                                        },
                                    });
                                },
                                {
                                    loading: "Submitting score...",
                                    success: "Score submitted!",
                                    error: "Failed to submit score!",
                                },
                            );
                            router.refresh();
                        }}
                        className="w-48 max-w-screen-md shrink md:w-72"
                    >
                        Finalize score
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
