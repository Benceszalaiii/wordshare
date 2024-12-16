"use client";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { LoadingCircle } from "../shared/icons";
import { Button } from "../ui/button";
const formSchema = z.object({
    taskname: z
        .string({ message: "Title must be atleast 2 characters." })
        .min(2)
        .max(100)
        .default(""),
    taskdescription: z.string().max(200).optional(),
    taskduedate: z.date(),
});

export function NewTaskForm({
    isMobile,
    classId,
}: {
    isMobile: boolean;
    classId: string;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const [dateOpen, setDateOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setSubmitted(true);
        const res = await fetch(`/api/class/task/${classId}`, {
            method: "POST",
            body: JSON.stringify({
                title: data.taskname,
                dueDate: addDays(data.taskduedate, 1),
                content: data.taskdescription,
            }),
        });
        if (res.ok) {
            toast.success("Task uploaded!");
            router.refresh();
        } else {
            toast.error("Failed to upload task.");
            setSubmitted(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="pointer-events-auto space-y-8"
            >
                <FormField
                    control={form.control}
                    name="taskname"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Title *</FormLabel>
                            <Input
                                placeholder="Task title..."
                                {...field}
                                value={field.value || ""}
                            />
                            <FormDescription>
                                Give your task a clear name, as this will be the
                                primary field for students to navigate between
                                tasks.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taskdescription"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Description</FormLabel>
                            <Input
                                placeholder="Task description..."
                                {...field}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taskduedate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Due date *</FormLabel>

                            <Popover
                                onOpenChange={setDateOpen}
                                modal={false}
                                open={dateOpen}
                            >
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-96 pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="pointer-events-auto w-auto p-0"
                                    align="center"
                                >
                                    {/* //FIXME this is sadly not working with expanding cards.... */}
                                    {/* <Select
                                        onValueChange={(value) =>
                                            field.onChange(
                                                addDays(
                                                    new Date(),
                                                    parseInt(value),
                                                ),
                                            )
                                        }
                                    >
                                        <SelectTrigger className="z-[150]">
                                            <SelectValue placeholder="Presets" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className="z-[150]"
                                            position="popper"
                                        >
                                            <SelectItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                value="0"
                                            >
                                                Today
                                            </SelectItem>
                                            <SelectItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                value="1"
                                            >
                                                Tomorrow
                                            </SelectItem>
                                            <SelectItem
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                value="3"
                                            >
                                                In 3 days
                                            </SelectItem>
                                            <SelectItem
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                }}
                                                value="7"
                                            >
                                                In a week
                                            </SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        numberOfMonths={2}
                                        disabled={(date) =>
                                            date < new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormDescription>
                                The due date of the task. <br /> Submissions
                                will be accepted until 23:59 on this date.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={submitted} type="submit">
                    {submitted && <LoadingCircle className="mr-2" />} Submit
                </Button>
            </form>
        </Form>
    );
}
