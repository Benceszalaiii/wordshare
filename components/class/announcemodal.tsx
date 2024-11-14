import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";

const formSchema = z.object({
    announcementtitle: z
        .string({
            message: "Announcement must have a title of atleast 2 characters.",
        })
        .min(2)
        .max(200),
    announcementdescription: z.string().max(200).optional(),
});
export function AnnouncementModal({
    currentClassName,
    classId,
    children,
}: {
    currentClassName: string;
    children: React.ReactNode;
    classId: string;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const { isMobile } = useMediaQuery();
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitted(true);
        const res = await fetch(`/api/class/announce/${classId}`, {
            method: "POST",
            body: JSON.stringify({
                title: values.announcementtitle,
                content: values.announcementdescription,
            }),
        });
        if (res.ok) {
            toast.success("Announcement sent!");
            router.refresh();
        } else {
            toast.error("Failed to send announcement. Try again later.");
            setSubmitted(false);
        }
    }
    if (isMobile) {
        return (
            <>
                <DrawerTrigger className="h-full w-full text-start">
                    {children}
                </DrawerTrigger>
                <DrawerContent className="p-6 pb-12">
                    <DrawerHeader>
                        <DrawerTitle className="text-xl font-bold">
                            New Announcement to {currentClassName}
                        </DrawerTitle>
                    </DrawerHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="announcementtitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Hello Class!"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="announcementdescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Today is a great day!..."
                                                cols={3}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={submitted} type="submit">
                                Send announcement
                            </Button>
                        </form>
                    </Form>
                </DrawerContent>
            </>
        );
    }
    return (
        <>
            <DialogTrigger className="h-full w-full text-start">
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        New Announcement to {currentClassName}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="announcementtitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Hello Class!"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="announcementdescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Today is a great day!..."
                                            cols={3}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={submitted} type="submit">
                            Send announcement
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </>
    );
}
