"use server";
import { getAnnouncementsByClassId, getTasksByClassId } from "@/lib/db";
import { Announcement, Class, Task } from "@prisma/client";
import { TimelineFilter } from "./timelinefilter";
export type TaskProp = Task & {
    type: "task"
}

export type AnnouncementProp = Announcement &{
    type: "announcement"
}
export default async function ClassTimeline({ currentClass, canEdit }: { currentClass: Class, canEdit?: boolean }) {
    const announcements: AnnouncementProp[] = 
    ((await getAnnouncementsByClassId(currentClass.id)) || []).map(
        (announcement) => ({
            ...announcement,
            type: "announcement",
        })
    ) || [];
    const tasks: TaskProp[] = (await getTasksByClassId(currentClass.id)).map((taskWithoutProp)=> ({...taskWithoutProp, type: "task"})) || [];
    return <TimelineFilter tasks={tasks} announcements={announcements} />;
}
