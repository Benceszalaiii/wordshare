import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { getAllPointsUser, getUserById, isAdmin } from "@/lib/db";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Navbar points={null} session={session} role={null} />;
  }
  const dbUser = await getUserById(session.user.id);
  const points = dbUser?.role === "student" && await getAllPointsUser(session.user.id) || null;
  return <Navbar session={session} role={dbUser?.role} points={points} />;
}
