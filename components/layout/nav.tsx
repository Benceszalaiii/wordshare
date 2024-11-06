"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { getAllPointsUser, getBanner, getUserById, isAdmin } from "@/lib/db";
import { Bat, Tree } from "../shared/icons";
import Banner from "./banner";
import { cookies } from "next/headers";
import { fetchBanner } from "@/app/actions";

export default async function Nav() {
  const session = await getServerSession(authOptions);
  const getIcon = ()=>{
    switch (process.env.EVENT){
      case "HALLOWEEN":
        return <Bat className="text-main-700 transition-all duration-500 group-hover:scale-150 group-hover:zoom-in-150 group-hover:text-transparent" />;
      case "XMAS":
        return <Tree className="text-green-700 transition-colors duration-500 group-hover:text-main-700" />;
      default:
        return null;
    }
  }
  // await fetchBanner()
  // {title: "Welcome to the new school year!", id: 23, show:false};
  const getBannerWithFallback = async ()=> {
    try{
      const res = await fetchBanner();
      return res;
    }catch(e){
    return {title: "You couldn't be connected to the database. Check your internet connection", id: 69420, show:true};
    }
  }
  const res = await getBannerWithFallback();

  if (!session) {
    return <Navbar bannerProps={res} EventIcon={getIcon()} points={null} session={session} role={null} />;
  }
  const dbUser = await getUserById(session.user.id);
  const points = dbUser?.role === "student" && await getAllPointsUser(session.user.id) || null;

  return <Navbar bannerProps={res} session={session} role={dbUser?.role} points={points} EventIcon={getIcon()} />;
}
