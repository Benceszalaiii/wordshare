"use server";

import { getAllPointsUser, getUserById } from "@/lib/db";

import { Bat, Tree } from "../shared/icons";
import Navbar from "./navbar";

import { fetchBanner } from "@/app/actions";
import { auth } from "@/lib/auth";
import { Rabbit } from "lucide-react";

export default async function Nav() {
    const getIcon = () => {
        switch (process.env.EVENT) {
            case "HALLOWEEN":
                return (
                    <Bat className="text-main-700 transition-all duration-500 group-hover:scale-150 group-hover:text-transparent group-hover:zoom-in-150" />
                );
            case "XMAS":
                return (
                    <Tree className="text-green-700 transition-colors duration-500 group-hover:text-main-700" />
                );
            case "NEWYEAR":
                return (
                    <span className="motion-duration-700 group-hover:motion-preset-confetti">
                        🥂
                    </span>
                );
            case "EASTER":
                return (
                    <Rabbit className="text-main-700 ease-spring-bouncy group-hover:animate-jump" />
                );
            default:
                return null;
        }
    };
    const session = await auth();
    const getBannerWithFallback = async () => {
        try {
            const res = await fetchBanner();
            return res;
        } catch (e) {
            return {
                title: "You couldn't be connected to the database. Check your internet connection",
                id: 69420,
                show: false,
            };
        }
    };
    const res = await getBannerWithFallback();

    if (!session) {
        return (
            <Navbar
                bannerProps={res}
                EventIcon={getIcon()}
                points={null}
                session={session}
                role={null}
            />
        );
    }
    if (!session.user || !session.user.id) {
        return (
            <Navbar
                bannerProps={res}
                EventIcon={getIcon()}
                points={null}
                session={session}
                role={null}
            />
        );
    }
    const dbUser = await getUserById(session.user.id);
    const points =
        (dbUser?.role === "student" &&
            (await getAllPointsUser(session.user.id))) ||
        null;

    return (
        <Navbar
            bannerProps={res}
            session={session}
            role={dbUser?.role}
            points={points}
            EventIcon={getIcon()}
        />
    );
}
