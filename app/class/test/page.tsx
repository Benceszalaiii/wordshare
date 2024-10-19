"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { Suspense } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@radix-ui/react-dropdown-menu";
export default async function Page() {
    const classId = "6969";
    return (
        <section className="flex flex-col justify-center items-center gap-8">
            <h1 className="text-2xl font-bold">Banner</h1>
            <form className="flex flex-col justify-center items-center gap-4" action={async(formData)=> {
                if (!formData.get("classId") || !formData.get("banner")){
                    toast.error("Please provide a classId and a banner");
                    return;
                }
                const res = await fetch(`/class/banners/${formData.get("classId")?.toString()}`, {method: "POST", body: formData.get("banner"), cache: "reload"});
                if (!res.ok){
                    toast.error("An error occurred while uploading the banner");
                }
                else{
                    toast.success("Banner uploaded successfully. It may take up to a minute to see the changes.");
                }
            }}>
                <Input required type="text" name="classId" placeholder="Class id" />
            <Input required type="file" name="banner" />
        <Button type="submit">Click to upload</Button>
        </form>
        <Suspense fallback={(<Skeleton className="h-[400px] w-[1024px]" />)}>
        <Image src={`/class/banners/${classId}`} alt="Banner" width={1024} height={400} loading="lazy" />
        </Suspense>
        <Separator/>
        <h1 className="text-2xl font-bold">Icon</h1>
        <form className="flex flex-col justify-center items-center gap-4" action={async(formData)=> {
                if (!formData.get("classId") || !formData.get("icon")){
                    toast.error("Please provide a classId and a icon");
                    return;
                }
                const res = await fetch(`/class/icons/${formData.get("classId")?.toString()}`, {method: "POST", body: formData.get("icon"), cache: "reload"});
                if (!res.ok){
                    toast.error("An error occurred while uploading the icon");
                }
                else{
                    toast.success("Icon uploaded successfully. It may take up to a minute to see the changes.");
                }
            }}>
                <Input required type="text" name="classId" placeholder="Class id" />
            <Input required type="file" name="icon" />
        <Button type="submit">Click to upload</Button>
        </form>
        <Image src={`/class/icons/${classId}`} alt="icon" width={500} height={500} className=" bg-red-200"/>
        </section>
    )
}