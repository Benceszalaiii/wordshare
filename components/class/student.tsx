import { Class } from "@prisma/client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default function StudentClassList({classes}: {classes: Class[] | null}) {
    if (!classes) return (
        <section>
        <p className="px-4 md:px-24 flex flex-col gap-4 justify-center">You currently have no classes. Check your <Link href={"/class/invites"} className="underline">invites</Link> or ask your teacher to invite</p>
        </section>
    )
    return (
        <section className="px-4 md:px-24 flex flex-col gap-4 justify-center ">
            {classes.map((c)=> (
                <Card key={c.id}>
                    <CardHeader>
                        <CardTitle>{c.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{c.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild><Link href={`/class/${c.id}`}>Open</Link></Button>
                    </CardFooter>
                </Card>
            ))}
        </section>
    )
}