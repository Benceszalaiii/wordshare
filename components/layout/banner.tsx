"use client";

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import * as React from "react";
import { cookies } from "next/headers";
import { getBanner } from "@/lib/db";
import { useRouter } from "next/navigation";
import { dismissBanner } from "@/app/actions";
interface BannerProps {
    title: string;
    show: boolean;
    id: number;
}

export default function Banner({
    className,
    bannerProps,
}: {
    bannerProps: { show: boolean; id: number; title: string };
    className?: string;
}) {
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        setLoading(false);
    }, []);
    if (loading) {
        return null;
    }
    if (!bannerProps) {
        return null;
    }
    if (bannerProps.show === false) {
        return null;
    }
    const cookieBannerId = document.cookie
        .split(";")
        .find((cookie) => cookie.includes("bannerId"))
        ?.split("=")[1];
    if (
        document.cookie.includes("bannerDismissed=true") &&
        document.cookie.includes(bannerProps.id.toString())
    ) {
        return null;
    }

    if (cookieBannerId !== bannerProps.id.toString()) {
        document.cookie.replace(
            `bannerId=${cookieBannerId}`,
            `bannerId=${bannerProps.id}`,
        );
        document.cookie.replace(
            "bannerDismissed=true",
            "bannerDismissed=false",
        );
    }
    return (
        <div
            className={cn(
                "flex h-14 w-full flex-row items-center justify-end border-b border-border bg-beige-400 px-6 dark:bg-black",
                className,
            )}
        >
            <h1 className="ml-auto mr-auto line-clamp-2 flex h-14 p-2 text-center font-display font-semibold tracking-wider sm:items-center">
                {bannerProps.title}
            </h1>
            {bannerProps.id !== 69420 && (
                <button
                    onClick={() => {
                        toast.promise(
                            dismissBanner(bannerProps.id.toString()).then(
                                () => {
                                    router.refresh();
                                },
                            ),
                            {
                                position: "top-right",
                                duration: 2000,
                                style: { marginTop: "6rem" },
                                loading: "Dismissing banner...",
                                success: "Banner dismissed",
                                error: "Failed to dismiss banner. Try refreshing your browser, or check your internet connection.",
                            },
                        );
                    }}
                >
                    <XIcon className="h-6 w-6" />
                </button>
            )}
        </div>
    );
}
