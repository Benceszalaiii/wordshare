"use client";
import * as React from "react";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { caveat } from "@/app/fonts";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../theme";
import { DashboardIcon } from "@radix-ui/react-icons";
import { AllPoints } from "../shared/points";
import { ReactNode } from "react";
import { Points } from "@prisma/client";
export default function NavBar({
    session,
    role,
    points,
    EventIcon,
}: {
    session: Session | null;
    role: string | null | undefined;
    points: Points[] | null;
    EventIcon?: React.ReactNode;
}) {
    const { SignInModal, setShowSignInModal } = useSignInModal();
    const scrolled = useScroll(50);
    const pathname = usePathname();
    const isIndexPage = pathname === "/";
    const needsExpand = (scrolled && isIndexPage) || !isIndexPage;
    const isSideBar = ["/class", "/essay", "/wordplay", "/invites"].some(
        (path) => pathname.startsWith(path),
    );
    const pointSum = () => {
        let sum = 0;
        points?.forEach((point) => (sum += point.points));
        return sum;
    };
    const [calculatedPoints, setCalculatedPoints] = React.useState<number>(
        pointSum(),
    );
    const [isClassPoints, setIsClassPoints] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (pathname.startsWith("/class")) {
            const classId = pathname.split("/")[2];
            console.log(classId);
            if (classId) {
                let calcpoints = points?.find(
                    (point) => point.classId === classId,
                )?.points;
                    setCalculatedPoints(calcpoints || 0);
                    setIsClassPoints(true);
            }
        }else{ setIsClassPoints(false)}
    }, [pathname]);
    if (role === "admin") {
        return (
            <div className="mb-24">
                <SignInModal />
                <div
                    className={`fixed top-0 flex w-full items-center justify-center px-4 ${
                        needsExpand
                            ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
                            : "bg-white/0 dark:bg-black/0 "
                    } ${
                        isSideBar
                            ? "border-b border-border bg-gray-200 dark:bg-neutral-900"
                            : ""
                    } z-30 transition-all duration-300`}
                >
                    <div
                        className={`mx-2 flex h-16 w-full items-center justify-between transition-all duration-500 ease-in-out ${
                            needsExpand ? `max-w-full` : `max-w-screen-md`
                        }`}
                    >
                        <Link href="/" className="flex font-display text-2xl">
                            <div className="group flex flex-row items-center gap-1">
                                {EventIcon && (EventIcon as ReactNode)}
                                <p
                                    className={`tracking-wider  text-main-600 shadow-main-700 group-hover:text-main-700 dark:text-main-600 dark:group-hover:text-main-500 ${caveat.className} `}
                                >
                                    WordShare
                                </p>
                            </div>
                        </Link>
                        <div className="flex flex-row items-center justify-center gap-2">
                            {points && <AllPoints isClassPoints={isClassPoints} points={calculatedPoints} />}
                            <div className={`pr-0`}>
                                {session ? (
                                    <UserDropdown
                                        session={session}
                                        role={role}
                                    />
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
                            <Link
                                href={"/admin"}
                                className="flex items-center"
                                passHref
                            >
                                <DashboardIcon className="h-6 w-6 text-black dark:text-white" />
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
                className={`fixed top-0 flex w-full justify-center px-4 transition-all ${
                    needsExpand
                        ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
                        : "bg-white/0 dark:bg-black/0 "
                }  ${
                    isSideBar
                        ? "border-b  border-border bg-gray-200 dark:bg-neutral-900"
                        : ""
                } z-30 transition-all duration-300`}
            >
                <div
                    className={`mx-2 flex h-16 w-full items-center justify-between transition-all duration-500 ease-in-out ${
                        needsExpand ? `max-w-full` : `max-w-screen-md`
                    }`}
                >
                    <Link href="/" className="flex font-display text-2xl">
                        <div className="group flex flex-row items-center gap-1">
                            {EventIcon && (EventIcon as ReactNode)}
                            <p
                                className={`tracking-wider text-main-600 shadow-main-700 group-hover:text-main-700 dark:text-main-600 dark:group-hover:text-main-500 ${caveat.className} `}
                            >
                                WordShare
                            </p>
                        </div>
                    </Link>
                    <div className={`flex flex-row gap-4 pr-4`}>
                        {points && <AllPoints isClassPoints={isClassPoints} points={calculatedPoints} />}
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
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </div>
    );
}
