"use client";

import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { caveat } from "@/app/fonts";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../theme";

export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const isIndexPage = pathname === "/";
  const needsExpand = (scrolled && isIndexPage) || !isIndexPage;
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full flex justify-center ${
          needsExpand
            ? " bg-white/50 dark:bg-black/70 backdrop-blur-xl justify-center"
            : "bg-white/0 dark:bg-black/0 "
        } z-30 transition-all duration-300`}
      >
        <div className={`mx-2 flex h-16 items-center justify-between transition-all ease-in-out duration-500 w-full ${needsExpand ? `max-w-screen-2xl`: `max-w-screen-md`}`}>
          <Link href="/" className="flex font-display text-2xl">
            <p className={`text-indigo-800 tracking-wider dark:text-indigo-600 text-shadow-xl shadow-indigo-700 dark:hover:text-indigo-500 ${pathname.startsWith("/overview") ? "hidden" : ""} ${caveat.className} `}>WordShare</p>
          </Link>
          <div className={`pr-0`}>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className={`rounded-full border border-black bg-black dark:hover:bg-neutral-400 dark:hover:border-neutral-400 dark:hover:text-black dark:text-black dark:bg-white dark:border-white p-1.5 px-4 text-sm text-white transition-all duration-0 }`}
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
