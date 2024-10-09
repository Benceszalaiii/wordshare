"use client";

import { deleteRoadmap, MarkRoadmapDone, MarkRoadmapUndone } from "@/lib/db";
import { CheckIcon, CircleSlashIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function UndoButtons({ roadmapId }: { roadmapId: number }) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={async () => {
          toast.promise(
            async () => {
              await fetch("/api/roadmap", {
                method: "POST",
                headers: { method: "undo", id: roadmapId.toString() },
              });
              router.refresh();
            },
            {
              richColors: true,
              loading: "Saving...",
              success: "Saved!",
              error: "Error saving.",
            },
          );
        }}
        title="Mark as undone"
      >
        <CircleSlashIcon
          size={18}
          className="text-yellow-700 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </button>
      <button
        onClick={async () => {
          toast.promise(
            async () => {
              await fetch("/api/roadmap", {
                method: "DELETE",
                headers: { id: roadmapId.toString() },
              });
              router.refresh();
            },
            {
              richColors: true,
              loading: "Deleting...",
              success: "Deleted!",
              error: "Error deleting.",
            },
          );
        }}
        title="Remove"
      >
        <TrashIcon
          size={18}
          className="text-red-700 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </button>
    </>
  );
}

export function SaveButton({ roadmapId }: { roadmapId: number }) {
  const router = useRouter();
  return (
    <>
      <button
        onClick={async () => {
          toast.promise(
            async () => {
              await fetch("/api/roadmap", {
                method: "POST",
                headers: { method: "done", id: roadmapId.toString() },
              });
              router.refresh();
            },
            {
              richColors: true,
              loading: "Saving...",
              success: "Saved!",
              error: "Error saving.",
            },
          );
        }}
        title="Mark as done"
      >
        <CheckIcon
          size={18}
          className="text-green-700 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </button>
      <button
        onClick={async () => {
          toast.promise(
            async () => {
              await fetch("/api/roadmap", {
                method: "DELETE",
                headers: { id: roadmapId.toString() },
              });
              router.refresh();
            },
            {
              richColors: true,
              loading: "Deleting...",
              success: "Deleted!",
              error: "Error deleting.",
            },
          );

        }}
        title="Remove"
      >
        <TrashIcon
          size={18}
          className="text-red-700 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </button>
    </>
  );
}
