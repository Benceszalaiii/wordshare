"use client"

import { Button } from "@/components/ui/button";

export default function Page(){
    return(
    <section className="flex flex-col items-center justify-center w-full h-full">
    <h1>Create class</h1>
    <Button variant={"destructive"} onClick={
        ()=> {
            fetch("/api/bucket", {method: "POST", body: JSON.stringify({name: "test"})})
        }
    }>Click to test</Button>
    </section>)
}