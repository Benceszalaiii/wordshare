"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "../ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
export function TimelineSkeleton() {
    return (
        <>
            <section className="flex w-full max-w-screen-md flex-col gap-4 py-8">
                <header className="flex flex-col items-center justify-between gap-2 px-4 md:flex-row">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
                        Timeline
                    </h2>
                    <Select defaultValue="both" disabled>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="both">All</SelectItem>
                            <SelectItem value="task">Tasks</SelectItem>
                            <SelectItem value="announcement">
                                Announcements
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </header>
                <Separator />
                <div className="flex w-full flex-col items-center px-4 gap-4 justify-center">
                    <Card className="w-full h-48">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>
                                <Skeleton className="w-48 h-6" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="w-80 h-4 mb-2" />
                            <Skeleton className="w-72 h-4 " />
                        </CardContent>
                        <CardFooter className="flex flex-row justify-end">
                            <Skeleton className="h-10 w-24" />
                        </CardFooter>
                    </Card>
                </div>
                <Pagination>
                    <PaginationContent className="pointer-events-none text-gray-500">
                        <PaginationItem>
                            <Button variant={"ghost"}>
                                <ChevronLeft className="h-4 w-4" />
                                <span>Previous</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"ghost"}>1</Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"outline"}>2</Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"ghost"}>3</Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button variant={"ghost"}>
                                <span>Next</span>
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </section>
        </>
    );
}
