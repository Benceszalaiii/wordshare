"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import {  Caveat } from "next/font/google";
import ThemeSwitch from "../theme";
const caveat = Caveat({weight: ["700"], subsets: ["latin"], preload: true});
export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          scrolled
            ? " bg-white/50 dark:bg-black/70 backdrop-blur-xl justify-center"
            : "bg-white/0 dark:bg-black/0 "
        } z-30 transition-all duration-300`}
      >
        <div className={`mx-2 flex h-16 items-center justify-between transition-all ease-in-out duration-500 w-full ${scrolled ? `max-w-screen-2xl`: `max-w-screen-md`}`}>
          <Link href="/" className="flex font-display text-2xl">
            <p className={"text-indigo-800 tracking-wider dark:text-indigo-600 text-shadow-xl shadow-indigo-700 dark:hover:text-indigo-500  " + caveat.className}>Cukikak</p>
          </Link>
          <div className={`  ${scrolled ? `pr-0` : `pr-0`}`}>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className={`rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all  ${scrolled ? `hover:bg-none bg-none hover:underline dark:hover:bg-none dark:bg-none` : `hover:bg-white dark:hover:bg-neutral-800 dark:hover:text-white hover:text-black`}`}
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        <ThemeSwitch className="gap-5" />
      </div>
    </>
  );
}
