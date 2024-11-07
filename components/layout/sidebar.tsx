"use client";
import { caveat } from "@/app/fonts";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ReactElement,
    ReactNode,
    cloneElement,
    useEffect,
    useState,
} from "react";
export function SideBar() {
    const { isMobile } = useMediaQuery();
    const sidebar = useSearchParams().get("sidebar");
    const [isOpen, setIsOpen] = useState(sidebar ? sidebar === "true" : false);
    const router = useRouter();
    useEffect(() => {
        router.push("?sidebar=" + isOpen);
    }, [isOpen, router]);
    return (
        <>
            <button
                className={`fixed left-4 top-4 z-50 `}
                onClick={() => setIsOpen(isOpen ? false : true)}
            >
                <svg
                    className="h-8 w-8 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M5 7h14M5 12h14M5 17h14"
                    />
                </svg>
            </button>
            <aside
                className={`fixed left-0 top-0 z-20 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-transform  dark:border-neutral-800 dark:bg-black ${
                    isOpen ? "translate-x-0" : " -translate-x-full"
                }`}
            >
                <div className="h-full overflow-y-auto bg-white/50 px-3 pb-4 dark:bg-black/70">
                    <ul className="space-y-2 font-medium">
                        <SideBarLink
                            className={`${caveat.className} text-xl tracking-wider text-indigo-800 dark:text-indigo-600 dark:hover:text-indigo-500`}
                            href="/"
                        >
                            {" "}
                            WordShare{" "}
                        </SideBarLink>
                        <SideBarLink href="/essay"> Essays </SideBarLink>
                        <SideBarLink href="/overview/words">
                            {" "}
                            Words to learn{" "}
                        </SideBarLink>
                        <SideBarLink href="/overview/task"> Tasks </SideBarLink>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export function SideBarLink({
    children,
    className,
    href,
    icon,
}: {
    children: ReactNode;
    href: string;
    icon?: ReactNode;
    className?: string;
}) {
    return (
        <li>
            <Link
                href={href}
                className={cn(
                    "group flex items-center rounded-lg p-2 text-gray-900 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900",
                    className,
                )}
            >
                {icon
                    ? cloneElement(icon as ReactElement, {
                          className:
                              "h-5 w-5 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
                      })
                    : null}
                <span className="ms-3">{children}</span>
            </Link>
        </li>
    );
}
