"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Button,
  Textarea,
} from "@/components/form";
import { countWords } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from '../../../lib/utils';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  textarea: z.string().min(2).max(2500),
});

const inputclassName = "dark:text-light dark:bg-black focus:border focus:ring-none";

function onSubmit(values: z.infer<typeof formSchema>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values);
}
export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      textarea: "",
    },
  });
  // TODO Implement spotify here
const wordcount = countWords(form.watch("textarea"));
  return (
    <div className="px-32">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" maxLength={50} className={inputclassName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textarea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Start writing your essay here..."
                  className={cn("ring-0 focus:ring-0 focus:border focus:border-black dark:focus:border-white outline-none focus:outline-none dark:focus:ring-0 ",inputclassName)}
                  rows={25}
                  onKeyDown={(e)=> {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const start = e.currentTarget.selectionStart;
                      const end = e.currentTarget.selectionEnd;
                      e.currentTarget.value =
                        e.currentTarget.value.substring(0, start) +
                        "\t" +
                        e.currentTarget.value.substring(end);
                      e.currentTarget.selectionStart = e.currentTarget.selectionEnd =
                        start + 1;
                  }}}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Word count: {wordcount - 1} / 240
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="hover:underline">Submit</Button>
      </form>
    </Form>
    </div>
  );
}



