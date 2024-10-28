"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { InviteMailDataProps } from "../../lib/aws";
import ToastButton from "../../components/testers/toastbutton";

export default function Page() {
    const [toAddress, setToAddress] = useState("");
    return (
        <section className="flex flex-col items-center justify-center gap-4 space-y-4 p-4">
            <div className="flex w-80 flex-col justify-center gap-4">
                <Input
                    type="text"
                    name="email"
                    id="to"
                    placeholder="Destination address"
                    value={toAddress}
                    onChange={(e) => setToAddress(e.target.value)}
                />
                <Button
                    onClick={async () => {
                        const params: InviteMailDataProps = {
                            to: [toAddress],
                            class_name: "11C Kraken",
                            action_url: `https://wordshare.tech/invites`,
                            sender: {
                                name: "Bence",
                                email: "szalaibence0817@gmail.com",
                            },
                            receiver_name: "Bence",
                        };
                        const res = await fetch("/api/mail/invite", {
                            method: "POST",
                            body: JSON.stringify(params),
                        });
                        toast.info(await res.text());
                    }}
                    variant={"outline"}
                >
                    Test button
                </Button>
                <ToastButton />
            </div>
        </section>
    );
}
