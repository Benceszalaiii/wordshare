"use client";
import { Announcement, Task } from "@prisma/client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { AnnouncementViewModal, TaskViewModal } from "./viewmodals";
import { Separator } from "../ui/separator";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from "../ui/select";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function TimelineFilter({
    tasks,
    announcements,
}: {
    tasks: Task[];
    announcements: Announcement[];
}) {
    const [viewMode, setViewMode] = useState("both");
    const [offset, setOffset] = useState(0);
    const [filteredTimeline, setFilteredTimeline] = useState(
        [...announcements, ...tasks].sort((a, b) => {
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        }),
    );
    const timeline = [...announcements, ...tasks].sort((a, b) => {
        return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    });
    useEffect(() => {
        if (viewMode === "both") {
            setFilteredTimeline(timeline);
        } else if (viewMode === "announceonly") {
            setFilteredTimeline(announcements);
        } else if (viewMode === "taskonly") {
            setFilteredTimeline(tasks);
        }
    }, [viewMode]);
    return (
        <section className="flex w-full max-w-screen-md flex-col gap-4 py-8">
            <header className="flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
                    Timeline
                </h2>
                <Select onValueChange={setViewMode}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select view mode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>View mode</SelectLabel>
                            <SelectItem defaultChecked value="both">
                                Tasks & Announcement
                            </SelectItem>
                            <SelectItem value="announceonly">
                                Announcements
                            </SelectItem>
                            <SelectItem value="taskonly">Tasks</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </header>
            <Separator />
            <div className="flex flex-col gap-4 px-4">
                {filteredTimeline
                    .slice(offset, offset + 20)
                    .map((item, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{item.title}</CardTitle>
                                <p className="text-gray-600">
                                    {item.createdAt.toUTCString()}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    {item.content}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="flex flex-row justify-end">
                                {item.hasOwnProperty("dueDate") ? (
                                    <TaskViewModal task={item} />
                                ) : (
                                    <AnnouncementViewModal
                                        announcement={item}
                                    />
                                )}
                            </CardFooter>
                        </Card>
                    ))}
            </div>
        </section>
    );
}
