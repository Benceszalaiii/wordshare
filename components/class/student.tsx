import { Class } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

export default function StudentClassList({
    classes,
}: {
    classes: Class[] | null;
}) {
    if (!classes)
        return (
            <section>
                <p className="flex flex-col justify-center gap-4 px-4 md:px-24">
                    You currently have no classes. Check your{" "}
                    <Link href={"/class/invites"} className="underline">
                        invites
                    </Link>{" "}
                    or ask your teacher to invite
                </p>
            </section>
        );
    return (
        <section className="flex flex-col justify-center gap-4 px-4 md:px-24 ">
            {classes.map((c) => (
                <Card key={c.id}>
                    <CardHeader>
                        <CardTitle>{c.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{c.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <Link href={`/class/${c.id}`}>Open</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </section>
    );
}
