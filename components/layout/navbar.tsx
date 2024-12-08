"use client";
import { caveat } from "@/app/fonts";
import UserDropdown from "@/components/layout/userdropdown";
import useScroll from "@/lib/hooks/use-scroll";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/ui/tooltip';
import { Points } from "@prisma/client";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ReactNode } from "react";
import { AllPoints } from "../shared/points";
import ThemeSwitch from "../theme";
import Banner from "./banner";
import SignInModal from "./signinmodal";
export default function NavBar({
    session,
    role,
    points,
    EventIcon,
    bannerProps,
}: {
    session: Session | null;
    role: string | null | undefined;
    points: Points[] | null;
    EventIcon?: React.ReactNode;
    bannerProps: { title: string; show: boolean; id: number };
}) {
    const scrolled = useScroll(50);
    const pathname = usePathname();
    const isIndexPage = pathname === "/";
    const needsExpand = (scrolled && isIndexPage) || !isIndexPage;
    const isSideBar = [
        "/class",
        "/essay",
        "/wordplay",
        "/invites",
        "/overview",
        "/tasks",
    ].some((path) => pathname.startsWith(path));
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
            if (classId) {
                let calcpoints = points?.find(
                    (point) => point.classId === classId,
                )?.points;
                setCalculatedPoints(calcpoints || 0);
                setIsClassPoints(true);
            }
        } else {
            setIsClassPoints(false);
        }
    }, [pathname, points]);
    if (role === "admin") {
        return (
            <div className="sticky top-0 z-50 mb-12 flex w-full flex-col items-center justify-center transition-all">
                <TooltipProvider>
                <Banner bannerProps={bannerProps} />
                <div
                    className={`flex w-full items-center justify-center px-4 ${
                        needsExpand
                        ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
                        : "bg-white/0 dark:bg-black/0 "
                        } ${
                            isSideBar
                            ? "border-b border-border bg-gray-200 dark:bg-neutral-900"
                            : ""
                            } transition-all duration-300`}
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
                                    className={`tracking-wider duration-500 group-hover:motion-preset-confetti text-main-600 shadow-main-700 group-hover:text-main-700 dark:text-main-600 dark:group-hover:text-main-500 ${caveat.className} `}
                                    >

                                    WordShare
                                </p>
                            </div>
                        </Link>
                        <div className="flex flex-row items-center justify-center gap-2">
                            {points && (
                                <AllPoints
                                isClassPoints={isClassPoints}
                                points={calculatedPoints}
                                />
                            )}
                            <div className={`pr-0`}>
                                {session ? (
                                    <UserDropdown
                                    session={session}
                                    role={role}
                                    />
                                ) : (
                                    <SignInModal />
                                )}
                            </div>
                            <Tooltip>
                            <TooltipTrigger asChild>
                            <ThemeSwitch className="" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Switch Appearance</p>
                            </TooltipContent>
                            </Tooltip>
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
            </TooltipProvider>
            </div>
        );
    }
    return (
        <div className="sticky top-0 z-50 mb-12 flex w-full flex-col items-center justify-center transition-all">
            <Banner bannerProps={bannerProps} />
            <div
                className={`flex w-full items-center justify-center px-4 ${
                    needsExpand
                        ? " justify-center bg-white/50 backdrop-blur-xl dark:bg-black/70"
                        : "bg-white/0 dark:bg-black/0 "
                }  ${
                    isSideBar
                        ? "border-b  border-border bg-gray-200 dark:bg-neutral-900"
                        : ""
                }  transition-all duration-300`}
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
                                className={`tracking-wider hover:motion-safe:motion-preset-shake motion-duration-500 text-main-600 shadow-main-700 group-hover:text-main-700 dark:text-main-600 dark:group-hover:text-main-500 ${caveat.className} `}
                            >
                                WordShare
                            </p>
                        </div>
                    </Link>
                    <div className={`flex flex-row gap-4 pr-4`}>
                        {points && (
                            <AllPoints
                                isClassPoints={isClassPoints}
                                points={calculatedPoints}
                            />
                        )}
                        {session ? (
                            <UserDropdown session={session} role={role} />
                        ) : (
                            <SignInModal />
                        )}
                        <ThemeSwitch />
                    </div>
                </div>
            </div>
        </div>
    );
}
