"use client";
import { getPinStatus, pinClass, unpinClass } from "@/app/class/[id]/actions";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function DropdownPinCheck({ classId }: { classId: string }) {
    const [remoteValue, setRemoteValue] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPinStatus(classId).then((res) => {
            setRemoteValue(res || false);
            setLoading(false);
        });
    }, [classId]);
    return (
        <DropdownMenuCheckboxItem
            checked={remoteValue}
            onCheckedChange={(e) => {
                if (e) {
                    pinClass(classId);
                } else {
                    unpinClass(classId);
                }
            }}
            disabled={loading}
        >
            Pin Class to Sidebar
        </DropdownMenuCheckboxItem>
    );
}
