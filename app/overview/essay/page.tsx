import React from "react";

export default function Page(){
    return (<>
    <h1>All essays</h1>
    </>
    )
}

export async function EssayList({ children }: { children: React.ReactNode }) {
    const essays = await fetch("/api/essay/get");
    return <>{children}</>;
}
export function EssayCard({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
