"use server";
import { AddRoadMap2 } from "@/components/roadmap/roadmapsubmit";
import { auth } from "@/lib/auth";
import { getRoadmap, getUserById } from "@/lib/db";
import {
    AdminRoadmapBlock,
    RoadmapBlock,
} from "../../components/roadmap/roadmap";

export default async function Page() {
    const roadmap = await getRoadmap();
    const session = await auth();
    const user = session?.user;
    if (user) {
        const dbUser = await getUserById(user.id);
        if (dbUser && dbUser.role === "admin") {
            return (
                <div className="flex flex-col items-start lg:mx-64">
                    <div className="flex flex-col items-start gap-4 px-4 py-12 sm:px-6 lg:px-8">
                        <h2 className="mb-8 ml-4 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                            Roadmap
                        </h2>
                        <ol className="relative flex w-full flex-col items-start border-s border-main-500 dark:border-main-500">
                            {roadmap
                                .toSorted((a, b) => a.id - b.id)
                                .map((item) => {
                                    const id = item.id;
                                    return (
                                        <AdminRoadmapBlock
                                            id={id}
                                            key={item.id}
                                            title={item.title}
                                            date={item.date}
                                        >
                                            {item.description}
                                        </AdminRoadmapBlock>
                                    );
                                })}
                            <AddRoadMap2 className="ml-5" />
                        </ol>
                    </div>
                </div>
            );
        }
    }
    return (
        <div className="flex flex-col items-start md:mx-96">
            <div className="flex flex-col items-start gap-4 px-4 py-12 sm:px-6 lg:px-8">
                <h2 className="mb-8 ml-4 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                    Roadmap
                </h2>
                <ol className="relative flex w-full flex-col items-start border-s border-neutral-200 dark:border-neutral-700">
                    {roadmap
                        .toSorted((a, b) => a.id - b.id)
                        .map((item) => {
                            return (
                                <RoadmapBlock
                                    key={item.id}
                                    title={item.title}
                                    date={item.date}
                                >
                                    {item.description}
                                </RoadmapBlock>
                            );
                        })}
                </ol>
            </div>
        </div>
    );
}
