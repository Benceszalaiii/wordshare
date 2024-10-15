"use client"
import { toast } from "sonner";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button"
export async function VerifyRequest({user}: {user: User}){

    return (
<Button variant={"outline"} onSubmit={()=> {
    toast.promise(async()=> {
        
    })
}}>Verify</Button>
    )
}