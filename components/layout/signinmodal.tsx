"use client";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import * as React from "react";
import { Google, LoadingDots } from "../shared/icons";
import { signIn } from "next-auth/react";
export default function SignInModal({}: {}) {
    const isMobile = useIsMobile();
    const [open, setOpen] = React.useState(false);
    const [signInClicked, setSignInClicked] = React.useState(false);

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="signin">Sign in</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-center">
                        <DrawerTitle>Sign in</DrawerTitle>
                        <DrawerDescription>
                            Please sign in using the one of the following
                            options
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerDescription className="px-16">
                        <Button
                            disabled={signInClicked}
                            variant={"ghost"}
                            className={`flex h-10 w-full items-center justify-center space-x-3 rounded-xl border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                            onClick={() => {
                                setSignInClicked(true);
                                signIn("google");
                            }}
                        >
                            {signInClicked ? (
                                <LoadingDots color="#808080" />
                            ) : (
                                <>
                                    <Google className="h-5 w-5" />
                                    <p>Sign In with Google</p>
                                </>
                            )}{" "}
                        </Button>
                    </DrawerDescription>
                    <DrawerFooter className="mb-6 mt-12"></DrawerFooter>
                </DrawerContent>
            </Drawer>
        );
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="signin">Sign in</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign in</DialogTitle>
                    <DialogDescription>
                        Please sign in using the one of the following options
                    </DialogDescription>
                </DialogHeader>
                <Button
                    disabled={signInClicked}
                    variant={"ghost"}
                    className={`flex h-10 w-full items-center justify-center space-x-3 rounded-xl border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                    onClick={() => {
                        setSignInClicked(true);
                        signIn("google");
                    }}
                >
                    {signInClicked ? (
                        <LoadingDots color="#808080" />
                    ) : (
                        <>
                            <Google className="h-5 w-5" />
                            <p>Sign In with Google</p>
                        </>
                    )}{" "}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
