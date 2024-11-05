import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Warning } from "@/components/ui/alerts";
import { SideBar } from "@/components/layout/sidebar";
import { ReactNode } from "react";
import React from "react";
import WipPage from '../../components/wip';

export default async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <>
    <WipPage><span className="text-main-600 text-4xl font-bold">Overview</span></WipPage>
    </>
  );
}
