import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { getUserById, isAdmin } from "@/lib/db";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Navbar session={session} role={null} />;
  }
  const dbUser = await getUserById(session.user.id);
  return <Navbar session={session} role={dbUser?.role} />;
}
