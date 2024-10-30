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
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { ChevronLeft, ChevronRight } from "lucide-react";
  
export function TimelineFilter({
    tasks,
    announcements,
}: {
    tasks: Task[];
    announcements: Announcement[];
}) {
    const [viewMode, setViewMode] = useState("both");
    const [page, setPage] = useState(1);
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
        setPage(1)
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
                    .slice(10 * (page - 1), 10 * page)
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
                <Pagination>
                    <PaginationContent>
                        <PaginationItem className={`${page <= 1? "hidden" : ""}`} >
                        <Button onClick={()=> {
                            if (page > 1) setPage(page-1)
                        }} variant={"ghost"}>
                            <ChevronLeft className="h-4 w-4" />
                            <span>Previous</span>
                        </Button>
                        </PaginationItem>
                        <PaginationItem className={`${page <= 1? "hidden" : ""}`}>
                        <Button onClick={()=> {
                            if (page > 1) setPage(page-1)
                        }} variant={"ghost"}>{page-1}</Button>
                        </PaginationItem>
                        <PaginationItem>
                        <Button variant={"outline"}>{page}</Button>
                        </PaginationItem>
                        <PaginationItem className={`${filteredTimeline.length >= 10*page? "" : "hidden"}`}>
                            <Button onClick={()=> {
                            if (filteredTimeline.length >= 10*page) setPage(page+1)
                        }}  variant={"ghost"}>{page+1}</Button>
                        </PaginationItem>
                        <PaginationItem className={`${filteredTimeline.length >= 10*page? "" : "hidden"}`}>
                        <Button onClick={()=> {
                            if (filteredTimeline.length >= 10*page) setPage(page+1)
                        }}  variant={"ghost"}>
                            <span>Next</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </section>
    );
}
