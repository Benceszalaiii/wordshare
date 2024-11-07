import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { getEssays } from "@/lib/db";
import { Essay } from "@/lib/utils";
import Link from "next/link";
export async function EssayList() {
    const res = await getEssays();
    if (res.status !== 200) {
        return <p>No essays found</p>;
    }
    const essays = await res.json();
    const essaylist: Essay[] = essays.essays;
    return (
        <>
            <section className="flex flex-row flex-wrap justify-stretch gap-5">
                {essaylist.map((essay: Essay) => {
                    return (
                        <Card key={essay.id} className="group min-w-48">
                            <CardHeader>
                                <CardTitle className="line-clamp-1">
                                    {essay.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="line-clamp-2 max-w-72">
                                    {essay.content}
                                </CardDescription>
                            </CardContent>
                            <CardFooter>
                                <Link
                                    href={`/essay/view/${essay.id}`}
                                    className=""
                                    passHref
                                >
                                    <Button className="border border-white">
                                        View
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
                <Link
                    className="group transition duration-300"
                    href={"/essay/write"}
                    passHref
                >
                    <Button
                        variant={"outline"}
                        title="Create New"
                        className="h-48 w-48"
                    >
                        <svg
                            className="h-6 w-6 text-gray-800 dark:text-gray-300 group-hover:dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 12h14m-7 7V5"
                            />
                        </svg>
                    </Button>
                </Link>
            </section>
        </>
    );
}
