import { ConstructionIcon } from "lucide-react";
import * as React from "react";
export default function WipPage({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-6">
            <ConstructionIcon strokeWidth={1} className="h-32 w-32" />
            <h1 className="text-4xl font-bold">{children}</h1>
            <p className="text-lg">This page is a work in progress.</p>
        </div>
    );
}
