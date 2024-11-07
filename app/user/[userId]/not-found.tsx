import { Button } from "@/components/ui/button";
import { UserRoundXIcon } from "lucide-react";

export default async function NotFound(){
    return (
        <section className="flex flex-col gap-4 h-full items-center justify-center w-full">
            <UserRoundXIcon className="h-20 w-20 mt-36" />
            <h1 className="text-2xl font-semibold">User not found</h1>
            <Button variant={"shine"}>Home</Button>
        </section>
    )
}