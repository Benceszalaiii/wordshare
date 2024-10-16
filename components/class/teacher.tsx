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
  
export default function TeacherClassList({classes}: {classes: Class[]}) {
    return (
        <>
        <section>
            {classes.map((c)=> (
                <Card key={c.id}>
                    <CardHeader>
                        <CardTitle>{c.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{c.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button asChild><Link href={`/class/view/${c.id}`}>Open</Link></Button>
                    </CardFooter>
                </Card>
            ))}
        </section>
        </>
    )
}