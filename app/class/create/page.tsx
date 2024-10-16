"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
const FormSchema = z.object({
    language: z
        .string({
            required_error: "Please select an email to display.",
        }),
    classname: z.string({
        required_error: "Please enter a class name.",
    })
})
interface Language {
    name: string,
    code: string
}

const languages: Language[] = [
    {
        name: "English",
        code: "en"
    },
    {
        name: "Magyar",
        code: "hu"
    },
    {
        name: "Deutsch",
        code: "de"
    }
]

export default function Page() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast(
            (<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>)
        )
    }

    return (
        <section className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-semibold">Create class</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
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
                    name="language"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {languages.map((language) => (
                                        <SelectItem key={language.code} value={language.code}>{language.name}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage your classes in your{" "}
                                <Link href="/class/manage" className="underline underline-offset-1">created classes</Link>.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Create class</Button>
            </form>
        </Form>
        </section>
    )
}
