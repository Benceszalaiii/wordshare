"use client";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function DropdownPinCheck({ classId }: { classId: string }) {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [remoteValue, setRemoteValue] = useState(false);
    const router = useRouter();
    useEffect(() => {
        fetch(`/api/class/pin/${classId}`, { method: "GET", cache: "reload" }).then((res) => {
            setLoading(false);
            setChecked(res.statusText === "Pinned");
            setRemoteValue(res.statusText === "Pinned");
        });
    }, [classId]);
    useEffect(() => {
        if (loading) return;
        if (checked === remoteValue) return;
        if (!loading && checked) {
            fetch(`/api/class/pin/${classId}`, { method: "PUT" }).then((res)=> {
                toast.info(`Pinned class to Sidebar`);
                setRemoteValue(true);
                router.refresh();
            });
        } else if (!loading && !checked) {
            fetch(`/api/class/pin/${classId}`, { method: "DELETE" }).then((res) => {
                toast.info(`Unpinned class from Sidebar`);
                setRemoteValue(false);
                router.refresh();
            });
        }
    }, [classId, loading, checked, router, remoteValue]);
    return (
        <DropdownMenuCheckboxItem
            checked={checked}
            onCheckedChange={setChecked}
            disabled={loading}
        >
            Pin Class to Sidebar
        </DropdownMenuCheckboxItem>
    );
}
