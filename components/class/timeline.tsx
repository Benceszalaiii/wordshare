"use server";
import { getAnnouncementsByClassId, getTasksByClassId } from "@/lib/db";
import { Announcement, Class, Task } from "@prisma/client";
import { TimelineFilter } from "./timelinefilter";
export type TaskProp = Task & {
    type: "task";
};

export type AnnouncementProp = Announcement & {
    type: "announcement";
};
export default async function ClassTimeline({
    currentClass,
    canEdit,
}: {
    currentClass: Class;
    canEdit?: boolean;
}) {

    return <TimelineFilter classId={currentClass.id} />;
}
