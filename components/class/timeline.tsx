"use server";
import { getAnnouncementsByClassId, getTasksByClassId } from "@/lib/db";
import { Class } from "@prisma/client";
import { Card, CardDescription, CardFooter, CardTitle, CardContent } from "../ui/card";
import { CardHeader } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Separator } from '@/components/ui/separator';
import Link from "next/link";
import { AnnouncementViewModal, TaskViewModal } from "./viewmodals";
import { TimelineFilter } from "./timelinefilter";

export async function ClassTimeline({ currentClass }: { currentClass: Class }) {
    const announcements = (await getAnnouncementsByClassId(currentClass.id)) || [];
    const tasks = (await getTasksByClassId(currentClass.id))|| [];
    return (
            <TimelineFilter tasks={tasks} announcements={announcements} />
    );
}
