"use client";

import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { caveat } from "@/app/fonts";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../theme";
import { DashboardIcon } from "@radix-ui/react-icons";

export default function NavBar({ session, role }: { session: Session | null, role: string | null | undefined}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const pathname = usePathname();
  const isIndexPage = pathname === "/";
  const needsExpand = (scrolled && isIndexPage) || !isIndexPage;
  const isSideBar = pathname.startsWith("/class") || pathname.startsWith("/overview") || pathname.startsWith("/essay") || pathname.startsWith("/wordplay");
  if (role === "admin"){
    return (
      <div className="mb-24">
        <SignInModal />
        <div
          className={`fixed top-0 px-4 flex w-full justify-center items-center ${
            needsExpand
              ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
              : "bg-white/0 dark:bg-black/0 "
          } ${isSideBar ? "bg-gray-200 dark:bg-neutral-900 dark:border-b-neutral-700 border-b-gray-300 border-b" : ""} z-30 transition-all duration-300`}
        >
          <div
            className={`mx-2 flex h-16 w-full items-center justify-between transition-all duration-500 ease-in-out ${
              needsExpand ? `max-w-full` : `max-w-screen-md`
            }`}
          >
            <Link href="/" className="flex font-display text-2xl">
              <p
                className={`tracking-wider text-indigo-800 shadow-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-500 ${caveat.className} `}
              >
                WordShare
              </p>
            </Link>
            <div className="flex flex-row gap-2 items-center justify-center">
              <div className={`pr-0`}>
                {session ? (
                  <UserDropdown session={session} role={role} />
                ) : (
                  <button
                    className={`} rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all duration-0 dark:border-white dark:bg-white dark:text-black dark:hover:border-neutral-400 dark:hover:bg-neutral-400 dark:hover:text-black`}
                    onClick={() => setShowSignInModal(true)}
                  >
                    Sign In
                  </button>
                )}
              </div>
                        <ThemeSwitch className="" />
                        <Link href={"/admin"} className="flex items-center" passHref>
                <DashboardIcon className="w-6 h-6 text-black dark:text-white" />
                        </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mb-24">
      <SignInModal />
      <div
        className={`fixed top-0 px-4 flex w-full justify-center ${
          needsExpand
            ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
            : "bg-white/0 dark:bg-black/0 "
        }  ${isSideBar ? "bg-gray-200 dark:bg-neutral-900 dark:border-b-neutral-700 border-b-gray-300 border-b" : ""} z-30 transition-all duration-300`}
      >
        <div
          className={`mx-2 flex h-16 w-full items-center justify-between transition-all duration-500 ease-in-out ${
            needsExpand ? `max-w-full` : `max-w-screen-md`
          }`}
        >
          <Link href="/" className="flex font-display text-2xl">
            <p
              className={`tracking-wider text-indigo-800 shadow-indigo-700 dark:text-indigo-600 dark:hover:text-indigo-500 ${
                pathname.startsWith("/overview") ? "hidden" : ""
              } ${caveat.className} `}
            >
              WordShare
            </p>
          </Link>
          <div className={`pr-0`}>
            {session ? (
              <UserDropdown session={session} role={role} />
            ) : (
              <button
                className={`} rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all duration-0 dark:border-white dark:bg-white dark:text-black dark:hover:border-neutral-400 dark:hover:bg-neutral-400 dark:hover:text-black`}
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
        <ThemeSwitch className="" />
      </div>
    </div>
  );
}
