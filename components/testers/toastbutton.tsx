"use client";
import { Button } from "../ui/button";
import { toast } from "sonner"; 
export default function ToastButton({text}: {text?: string}){
    return (
        <Button
        onClick={()=> {
            toast(text || "This is a toast", {richColors: true, duration: 5000})
        }}
        >
            {text || "Click for toast"}
        </Button>
    )
}