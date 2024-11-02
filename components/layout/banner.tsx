"use client"

import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import * as React from "react"
import { cookies } from "next/headers";
import { getBanner } from "@/lib/db";
import { useRouter } from "next/navigation";
interface BannerProps{
    title: string;
    show: boolean;
    id: number;
}

export default function Banner({ className, bannerProps}: {bannerProps: {show: boolean, id: number, title: string}, className?: string}){
    const router = useRouter();
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(()=> {
        setLoading(false);
    }, [])
    if (loading){
        return null;
    }
    if (!bannerProps){
        return null;
    }
    if (bannerProps.show === false){
        return null;
    }
    const cookieBannerId = document.cookie.split(";").find((cookie) => cookie.includes("bannerId"))?.split("=")[1];
    if (document.cookie.includes("bannerDismissed=true") && document.cookie.includes(bannerProps.id.toString())){
        return null;
    }
    console.log(cookieBannerId);
    if (cookieBannerId !== bannerProps.id.toString()){
        document.cookie.replace(`bannerId=${cookieBannerId}`, `bannerId=${bannerProps.id}`);
        document.cookie.replace("bannerDismissed=true", "bannerDismissed=false");
    }
    return (
        <div className={cn("w-full border-b px-6 border-border h-14 dark:bg-black bg-beige-400 flex flex-row items-center justify-end", className)}>
            <h1 className="mr-auto font-semibold font-display h-14 sm:items-center tracking-wider flex ml-auto text-center line-clamp-2 p-2">{bannerProps.title}</h1>
            <button onClick={() => {
                toast.promise(
                fetch("/api/banner", {method: "DELETE", headers: {"bannerId": bannerProps.id.toString()}}).then((res)=> {router.refresh()})
                ,
            {
                position: "top-right",
                duration: 2000,
                style: {marginTop: "6rem"},
                loading: "Dismissing banner...",
                success: "Banner dismissed",
                error: "Failed to dismiss banner. Try refreshing your browser, or check your internet connection."
            })
            }} >
            <XIcon className="h-6 w-6" />       
            </button>
        </div>
    )
}