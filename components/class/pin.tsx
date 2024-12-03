"use client";
import { getPinStatus, pinClass, unpinClass } from "@/app/(sidebar)/class/[id]/actions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MenubarCheckboxItem } from "../ui/menubar";

export function MenubarPinCheck({ classId }: { classId: string }) {
    const [loading, setLoading] = useState(true);
    const [remoteValue, setRemoteValue] = useState(false);
    useEffect(() => {
        getPinStatus(classId).then((res) => {
            setLoading(false);
            setRemoteValue(res);
        });
    }, [classId]);
    return (
        <MenubarCheckboxItem
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
            {loading ? "Getting pin status..." : "Pin Class to Sidebar"}
        </MenubarCheckboxItem>
    );
}
