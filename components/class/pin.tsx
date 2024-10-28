"use client";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import LoadingCircle from "../shared/icons/loading-circle";

const addPin = (router: any, setter: any, classId: string) => {
    fetch(`/api/class/pin/${classId}`, { method: "PUT" }).then((res) => {
        toast.info(`Pinned class to Sidebar`);
        setter(true);
        router.refresh();
    });
};
const removePin = (router: any, setter: any, classId: string) => {
    fetch(`/api/class/pin/${classId}`, { method: "DELETE" }).then((res) => {
        toast.info(`Unpinned class from Sidebar`);
        setter(false);
        router.refresh();
    });
};

export function DropdownPinCheck({ classId }: { classId: string }) {
    const [loading, setLoading] = useState(true);
    const [remoteValue, setRemoteValue] = useState(false);
    const router = useRouter();
    const baseValue = useMemo(() => {
        fetch(`/api/class/pin/${classId}`, { method: "GET" }).then((res) => {
            setLoading(false);
            setRemoteValue(res.statusText === "Pinned");
        });
        return remoteValue;
    }, [remoteValue, classId]);
    if (loading) {
        return (
            <DropdownMenuCheckboxItem
                disabled
                className="flex items-center justify-between gap-2 px-2"
            >
                <LoadingCircle />
                Pin to Sidebar
            </DropdownMenuCheckboxItem>
        );
    }
    return (
        <DropdownMenuCheckboxItem
            checked={baseValue}
            onCheckedChange={(e) => {
                if (e) {
                    addPin(router, setRemoteValue, classId);
                } else {
                    removePin(router, setRemoteValue, classId);
                }
            }}
            disabled={loading}
        >
            Pin Class to Sidebar
        </DropdownMenuCheckboxItem>
    );
}
