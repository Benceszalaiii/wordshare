"use client";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import LoadingCircle from "../shared/icons/loading-circle";
import { getPinStatus, pinClass, unpinClass } from "@/app/class/[id]/actions";


export function DropdownPinCheck({ classId }: { classId: string }) {
    const [remoteValue, setRemoteValue] = useState(false);
    const [ loading, setLoading ] = useState(true);
    useEffect(()=> {
        getPinStatus(classId).then((res)=> {
            setRemoteValue(res || false);
            setLoading(false);
        })
    }, [classId])
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
