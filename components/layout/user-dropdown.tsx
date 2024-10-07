"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, EditIcon, List } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";


export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-white p-2 sm:w-56 dark:bg-dark dark:border-gray-700">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900 dark:text-light">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500 dark:text-zinc-400">
                {session?.user?.email}
              </p>
            </div>
            <button
              className="relative flex w-full cursor-pointer items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-300 dark:hover:bg-neutral-800 text-dark dark:text-light "
              onClick={()=> {
                window.location.href = "/overview";
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Overview</p>
            </button>
            <button
              className="relative flex w-full cursor-pointer items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-300 dark:hover:bg-neutral-800 text-dark dark:text-light "
              onClick={()=> {
                window.location.href = "/essay";
              }}
            >
              <EditIcon className="h-4 w-4" />
              <p className="text-sm">Essays</p>
            </button>            
            <button
              className="relative flex w-full cursor-pointer items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-300 dark:hover:bg-neutral-800 text-dark dark:text-light "
              onClick={()=> {
                window.location.href = "/words";
              }}
            >
              <List className="h-4 w-4" />
              <p className="text-sm">Words</p>
            </button>
            <button
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 dark:hover:bg-neutral-800 text-dark dark:text-light"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 dark:border-gray-700 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}
