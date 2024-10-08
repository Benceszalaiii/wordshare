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
} from "@/components/ui/form";
import { countWords } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from '../../../lib/utils';
import { uploadEssay } from "@/lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  textarea: z.string().min(2).max(2500),
});

const inputclassName = "dark:text-light dark:bg-black focus:border focus:ring-none";

async function onSubmit(values: z.infer<typeof formSchema>, router: any) {
  const essay = {title: values.title, content: values.textarea};
  toast.promise(async()=>{
    const fetched = await uploadEssay(essay);
  }, {richColors: true, loading: "Uploading essay...", success: "Essay uploaded successfully!", error: "Error uploading essay."});
  router.push("/essay");
}
export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      textarea: "",
    },
  });
const textwatcher = form.watch("textarea");
const [words, setWords] = useState(0);
  useEffect(() => {
    const count_of_words = countWords(textwatcher);
    if (textwatcher === ""){
      setWords(0);
    }
    else if(count_of_words == 1) {
      setWords(count_of_words);
    }else{
      setWords(count_of_words);
    }
  }, [textwatcher, form])
  return (
    <div className="px-4 md:px-32">
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values)=> {
        onSubmit(values, router);
      })} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" maxLength={50} className={cn( "",inputclassName)} {...field} />
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
                  className={cn("ring-0 focus:ring-0 focus:border text-md max-h-96 focus:border-black dark:focus:border-white outline-none focus:outline-none dark:focus:ring-0 ",inputclassName)}
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
                Word count: {words} / 240
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



