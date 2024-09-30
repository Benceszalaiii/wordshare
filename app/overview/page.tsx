import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { Warning } from "@/components/alerts";
import { SideBar } from "@/components/sidebar";
import { ReactNode } from "react";
import React from 'react';
interface IProps {
    params: {};
    searchParams: {
      sidebar: string;
    };
  }
export default async function Page({searchParams}: IProps) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className={`min-w-screen gap-8 flex flex-col items-start ml-12 justify-start transition-all duration-75 ${searchParams.sidebar ==="true" ? `md:pl-72` : `md:pl-12`} px-4`}>
        <p className="z-10 text-dark dark:text-light">
          Welcome back {session?.user?.name}
        </p>
        <Warning>
          This page is a stub and is under renovations. You will find your
          active tasks here
        </Warning>
      </div>
    </>
  );
}
