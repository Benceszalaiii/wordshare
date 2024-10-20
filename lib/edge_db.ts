import { prisma } from "@lib/prisma"
export const runtime = "edge";
export async function getAllClasses(){
    const classes = await prisma.class.findMany();
    return classes
}
export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { id: id } });
  if (!user) {
    return null;
  }
  return user;
}