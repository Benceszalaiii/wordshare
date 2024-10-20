import prisma from "./prisma"
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
export async function getClassById(id: string | null){
  if (!id){
    return null;
  }
  const c = await prisma.class.findUnique({ where: { id: id } });
  return c;
}