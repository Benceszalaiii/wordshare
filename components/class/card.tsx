import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Class } from "@prisma/client";

export default function ClassCard({currentClass}: {currentClass: Class}) {
    return (
        <Card
            className="flex h-48 grow transform-gpu flex-col justify-between antialiased transition-all duration-500 hover:scale-110"
            key={currentClass.id}
        >
            <CardHeader className="flex flex-row items-center gap-2">
                <Avatar>
                    <AvatarImage
                        src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/icon`}
                    />
                    <AvatarFallback>{currentClass.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="cursor-default">{currentClass.name}</CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto flex w-full flex-row items-end justify-end">
                <Link
                    href={`/class/${currentClass.id}`}
                    className={buttonVariants({
                        variant: "outline",
                    })}
                >
                    Go to class
                </Link>
            </CardFooter>
        </Card>
    );
}
