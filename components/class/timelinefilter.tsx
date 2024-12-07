"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { AnnouncementProp, TaskProp } from "./timeline";
import { AnnouncementViewModal, TaskViewModal } from "./viewmodals";

import {
    getClassTimelineLength,
    getTimelineWithOffset,
} from "@/app/(sidebar)/class/[id]/actions";
import useSWR from "swr";
import { DateTooltip } from "../shared/date-tooltip";

type MixProps = TaskProp | AnnouncementProp;

export function TimelineFilter({ classId }: { classId: string }) {
    const [viewMode, setViewMode] = useState("both");
    const [page, setPage] = useState(1);
    const [filteredTimeline, setFilteredTimeline] = useState([] as MixProps[]);
    const [loading, setLoading] = useState(true);
    const { data, isLoading } = useSWR(classId, getClassTimelineLength);
    useEffect(() => {}, []);
    const getLengths = () => {
        if (viewMode === "both") {
            return (data?.announcements || 0) + (data?.tasks || 0);
        }
        if (viewMode === "task") {
            return data?.tasks || 0;
        }
        return data?.announcements || 0;
    };
    useEffect(() => {
        setPage(1);
    }, [viewMode]);
    useEffect(() => {
        setLoading(true);
        getTimelineWithOffset(
            classId,
            (page - 1) * 10,
            viewMode !== "both"
                ? (viewMode as "task" | "announcement")
                : undefined,
        )
            .then((res) => {
                setFilteredTimeline((res as MixProps[]) || []);
            })
            .catch((err) => {
                console.error(err);
                throw new Error("Failed to fetch timeline");
            })
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewMode, page]);
    return (
        <section className="flex w-full max-w-screen-md flex-col gap-4 py-8">
            <header className="flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    Timeline
                </h2>
                <Separator className="md:hidden" />
                <Select defaultValue="both" onValueChange={setViewMode}>
                    <SelectTrigger className="w-48 place-self-end">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Filter</SelectLabel>
                            <SelectItem value="both">
                                All{" "}
                                <Badge variant={"secondary"}>
                                    {isLoading
                                        ? "..."
                                        : (data?.announcements || 0) +
                                          (data?.tasks || 0)}
                                </Badge>
                            </SelectItem>
                            <SelectItem value="announcement">
                                Announcements{" "}
                                <Badge variant={"secondary"}>
                                    {isLoading
                                        ? "..."
                                        : data?.announcements || 0}
                                </Badge>
                            </SelectItem>
                            <SelectItem value="task">
                                Tasks{" "}
                                <Badge variant={"secondary"}>
                                    {isLoading ? "..." : data?.tasks || 0}
                                </Badge>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </header>
            <Separator className="hidden md:block" />
            <div className="flex flex-col gap-4 px-4">
                {isLoading || loading ? (
                    <p className="w-full text-center font-semibold text-gray-600 dark:text-gray-400">Loading Timeline...</p>
                )
                :
                filteredTimeline.length > 0 ? (
                    filteredTimeline.map((item, index) => {
                        if (item.type === "task") {
                            return (
                                <Card key={index} className="w-full">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <CardTitle>{item.title}</CardTitle>
                                        <p className="text-gray-600">
                                            <DateTooltip
                                                date={item.createdAt}
                                                relative
                                                withTime
                                            />
                                        </p>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="">
                                            Deadline:{" "}
                                            <DateTooltip
                                                date={item.dueDate}
                                                includeDifference
                                            />
                                        </p>
                                        <CardDescription>
                                            {item.content}
                                        </CardDescription>
                                    </CardContent>
                                    <CardFooter className="flex flex-row justify-end">
                                        <TaskViewModal task={item} />
                                    </CardFooter>
                                </Card>
                            );
                        }
                        return (
                            <Card key={index} className="w-full">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle>{item.title}</CardTitle>
                                    <p className="text-gray-600">
                                        <DateTooltip
                                            date={item.createdAt}
                                            relative
                                            withTime
                                        />
                                    </p>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {item.content}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex flex-row justify-end">
                                    <AnnouncementViewModal
                                        announcement={item}
                                    />
                                </CardFooter>
                            </Card>
                        );
                    })
                ) : (
                    <p className="w-full text-center font-semibold text-gray-600 dark:text-gray-400">
                        It&apos;s quiet in here.
                    </p>
                )}
                <Pagination>
                    <PaginationContent>
                        <PaginationItem
                            className={`${page <= 1 ? "hidden" : ""}`}
                        >
                            <Button
                                onClick={() => {
                                    if (page > 1) setPage(page - 1);
                                }}
                                variant={"ghost"}
                            >
                                <ChevronLeft className="h-4 w-4" />
                                <span>Previous</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem
                            className={`${page <= 1 ? "hidden" : ""}`}
                        >
                            <Button
                                onClick={() => {
                                    if (page > 1) setPage(page - 1);
                                }}
                                variant={"ghost"}
                            >
                                {page - 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"outline"}>{page}</Button>
                        </PaginationItem>
                        <PaginationItem
                            className={`${
                                filteredTimeline.length > 10 * page
                                    ? ""
                                    : "hidden"
                            }`}
                        >
                            <Button
                                onClick={() => {
                                    if (getLengths() > 10 * page)
                                        setPage(page + 1);
                                }}
                                variant={"ghost"}
                            >
                                {page + 1}
                            </Button>
                        </PaginationItem>
                        <PaginationItem
                            className={`${
                                getLengths() > 10 * page ? "" : "hidden"
                            }`}
                        >
                            <Button
                                onClick={() => {
                                    if (getLengths() > 10 * page)
                                        setPage(page + 1);
                                }}
                                variant={"ghost"}
                            >
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
