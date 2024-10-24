"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { TemplateMailProps } from "../../lib/email";

export default function Page() {
    const [toAddress, setToAddress] = useState("");
    return (
        <section className="flex flex-col items-center justify-center gap-4 space-y-4 p-4">
            <div className="flex w-80 flex-col justify-center gap-4">
                <Input
                    type="text"
                    name="To"
                    id="to"
                    placeholder="Destination address"
                    onChange={(e) => setToAddress(e.target.value)}
                />
                <Button
                    onClick={async () => {
                        const params: TemplateMailProps = {
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
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(params),
                        });
                        toast.info(await res.text());
                    }}
                    variant={"outline"}
                >
                    Test button
                </Button>
            </div>
        </section>
    );
}
