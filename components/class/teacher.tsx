"use client"
import { Class } from "@prisma/client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "../ui/button";
import Link from "next/link";
  
export default function TeacherClassList({classes}: {classes: Class[] | null}) {
    if (!classes) return (
        <>
        <p className="px-4 md:px-24">You currently have no classes.</p>
        </>
    )
    return (
        <>
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
        </>
    )
}