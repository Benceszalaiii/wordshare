import { getClassById } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }){
    const currentClass = await getClassById(params.id)
    if (!currentClass){
        return notFound();
    }
    return (
        <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{currentClass.name}</h1>
        <p className="font-semibold text-md text-gray-800 dark:text-gray-400">{currentClass.description}</p>
        </section>
    )
}