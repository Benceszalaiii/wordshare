"use client";
import { useState } from "react";
import { AnimatedGradientText } from "./ui/gradient-text";

export default function RandomTopic() {
    const [topic, setTopic] = useState("");
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <button
                onClick={() => {
                    setLoading(true);
                    fetch("/api/generative", {
                        method: "GET",
                        cache: "no-cache",
                    })
                        .then((res) =>
                            res.text().then((data) => {
                                setTopic(data);
                            }),
                        )
                        .finally(() => setLoading(false));
                }}
                disabled={loading}
            >
                <AnimatedGradientText>✨ Generate Topic</AnimatedGradientText>
            </button>
            {topic && <p>Your topic is: {topic}</p>}
        </div>
    );
}
