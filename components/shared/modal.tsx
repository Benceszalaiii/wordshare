"use client";

import useMediaQuery from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { Drawer } from "vaul";

export default function Modal({
    children,
    className,
    showModal,
    setShowModal,
}: {
    children: React.ReactNode;
    className?: string;
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
    const { isMobile } = useMediaQuery();

    if (isMobile) {
        return (
            <Drawer.Root open={showModal} onOpenChange={setShowModal}>
                <Drawer.Overlay className="fixed inset-0 z-40 bg-white/10 bg-opacity-80 backdrop-blur-sm dark:bg-black/50" />
                <Drawer.Portal>
                    <Drawer.Content
                        className={cn(
                            "fixed bottom-0 left-0 right-0 z-50 mb-36 mt-24 rounded-t-[10px] border-t border-beige-200 bg-beige-50 dark:border-gray-900 dark:bg-black",
                            className,
                        )}
                    >
                        <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
                            <div className="my-3 h-1 w-12 rounded-full bg-gray-300 dark:bg-gray-900" />
                        </div>
                        {children}
                    </Drawer.Content>
                    <Drawer.Overlay />
                </Drawer.Portal>
            </Drawer.Root>
        );
    }
    return (
        <Dialog.Root open={showModal} onOpenChange={setShowModal}>
            <Dialog.Portal>
                <Dialog.Overlay
                    // for detecting when there's an active opened modal
                    id="modal-backdrop"
                    className="animate-fade-in fixed inset-0 z-10 bg-white/10 bg-opacity-80 backdrop-blur-sm dark:bg-black/50"
                />
                <Dialog.Content
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    className={cn(
                        "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-main-300 bg-main-50 p-0 shadow-xl dark:border-gray-900 dark:bg-dark md:rounded-2xl",
                        className,
                    )}
                >
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
