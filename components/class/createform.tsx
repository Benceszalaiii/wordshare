"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { LoadingDots, LoadingSpinner } from "../shared/icons";
import LoaderDots from "../loader/dots";
import LoaderSpinner from "../loader/spinner";

interface Language {
    name: string;
    code: string;
}

const languages: Language[] = [
    {
        name: "English",
        code: "en",
    },
    {
        name: "Magyar",
        code: "hu",
    },
    {
        name: "Deutsch",
        code: "de",
    },
];

const FormSchema = z.object({
    language: z.string({
        required_error: "Please select a language.",
    }),
    classname: z
        .string({
            required_error: "Please enter a class name.",
        })
        .min(2, "The length should be atleast 2 characters.")
        .max(25, "The length should be atmost 25 characters."),
    description: z
        .string({})
        .max(100, "The length should be atmost 100 characters."),
});

export default function CreateForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            classname: "",
            description: "",
        },
    });
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    function onSubmit(data: z.infer<typeof FormSchema>) {
        if (submitted) return;
        setSubmitted(true);
        fetch("/api/class/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "class-lang": data.language,
                "class-name": data.classname,
                "class-desc": data.description,
            },
        })
            .then((res) => {
                if (res.ok) {
                    res.text().then((text) => {
                        toast.success(`Success: ${text}`);
                    });
                    router.push("/class/");
                } else {
                    res.text().then((text) => {
                        toast.error(`Error: ${text}`);
                    });
                }
            })
            .catch((err) => {
                toast.error(`Error creating class. Error: ${err}`);
            });
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="classname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Class name</FormLabel>
                            <FormControl>
                                <Input placeholder="11C English" {...field} />
                            </FormControl>
                            <FormDescription>
                                This will be the public name of the class.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Start typing here..."
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Description of the class. This is optional.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {languages.map((language: Language) => (
                                        <SelectItem
                                            key={language.code}
                                            value={language.code}
                                        >
                                            {language.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage your classes in your{" "}
                                <Link
                                    href="/class/manage"
                                    className="underline underline-offset-1"
                                >
                                    created classes
                                </Link>
                                .
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={submitted}
                    className={
                        submitted
                            ? twMerge(
                                  "motion-preset-confetti w-28 dark:text-white text-dark animate-pulse motion-duration-700",
                                  buttonVariants({ variant: "outline" }),
                              )
                            : twMerge("w-28",buttonVariants({ variant: "default" }))
                    }
                    
                    type="submit"
                >
                    {submitted ? <LoaderSpinner text={false} variation="normal" className="size-4" /> : "Create class"}
                </Button>
            </form>
        </Form>
    );
}
