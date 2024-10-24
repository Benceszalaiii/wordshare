"use client"
import { Button } from "@/components/ui/button";
import { shareToInstagram } from "@/lib/utils";

export default function Page(){
    return (
        <section className="flex flex-col items-center justify-center gap-4 p-4">
            <Button onClick={()=> {
                shareToInstagram();
            }} variant={"outline"}>Share to instagram</Button>
            <Button onClick={async()=>{
                await fetch("/api/mail", {headers: {"mailTemplate": "taskSubmit"}})
            }}>Send email</Button>
        </section>
    )
}