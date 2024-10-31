"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingCircle } from "../shared/icons";
const formSchema = z.object({
    taskname: z
        .string({ message: "Title must be atleast 2 characters." })
        .min(2)
        .max(100),
    taskdescription: z.string().max(200).optional(),
    taskduedate: z.date(),
});
export function NewTaskModal({
    children,
    currentClassName,
    classId
}: {
    children: React.ReactNode;
    currentClassName: string;
    classId: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setSubmitted(true);
        const res = await fetch(`/api/class/task/${classId}`, {method: "POST", body: JSON.stringify({title: data.taskname, dueDate: addDays(data.taskduedate, 1), content: data.taskdescription})});
        if (res.ok){ toast.success("Task uploaded!"); router.refresh()}
        else {toast.error("Failed to upload task."); setSubmitted(false);};
    }
    return (
        <>
            <DialogTrigger className="h-full w-full text-start">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        New Task
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="taskduedate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due date *</FormLabel>
                                    <Dialog>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                field.value,
                                                                "PPP",
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="pointer-events-auto w-auto p-0"
                                                align="start"
                                            >
                                                <Select
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            addDays(
                                                                new Date(),
                                                                parseInt(value),
                                                            ),
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="0">
                                                            Today
                                                        </SelectItem>
                                                        <SelectItem value="1">
                                                            Tomorrow
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            In 3 days
                                                        </SelectItem>
                                                        <SelectItem value="7">
                                                            In a week
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    numberOfMonths={2}
                                                    disabled={(date) =>
                                                        date < new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01",
                                                            )
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </Dialog>
                                    <FormDescription>
                                        The due date of the task. <br /> Submissions will be accepted until 23:59 on this date.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="taskname"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Title *</FormLabel>
                                    <Input
                                        placeholder="Task title..."
                                        {...field}
                                    />
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
                        <Button disabled={submitted} type="submit">{submitted && <LoadingCircle className="mr-2"/>} Submit</Button>
                    </form>
                </Form>
            </DialogContent>
        </>
    );
}
