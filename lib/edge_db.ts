import { prisma } from "@lib/prisma"

export async function getAllClasses(){
    const classes = await prisma.class.findMany();
    return classes
}