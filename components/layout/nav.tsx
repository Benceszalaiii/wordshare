import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { getAllPointsUser, getUserById, isAdmin } from "@/lib/db";
import { Bat, Tree } from "../shared/icons";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <Navbar points={null} session={session} role={null} />;
  }
  const dbUser = await getUserById(session.user.id);
  const points = dbUser?.role === "student" && await getAllPointsUser(session.user.id) || null;
  const getIcon = ()=>{
    switch (process.env.EVENT){
      case "HALLOWEEN":
        return <Bat className="text-main-700 transition-colors duration-500 group-hover:text-transparent" />;
      case "XMAS":
        return <Tree className="text-green-700 transition-colors duration-500 group-hover:text-main-700" />;
      default:
        return null;
    }
  }

  return <Navbar session={session} role={dbUser?.role} points={points} EventIcon={getIcon()} />;
}
