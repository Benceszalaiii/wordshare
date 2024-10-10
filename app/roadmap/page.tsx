"use server";
import { getRoadmap, getUserById } from "@/lib/db";
import {
  RoadmapBlock,
  AdminRoadmapBlock,
} from "../../components/roadmap/roadmap";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { AddRoadMap2 } from "@/components/roadmap/roadmapsubmit";

export default async function Page() {
  const roadmap = await getRoadmap();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (user) {
    const dbUser = await getUserById(user.id);
    if (dbUser && dbUser.role === "admin") {
      return (
        <div className="flex flex-col items-start lg:mx-64">
          <div className=" flex flex-col items-start  gap-4 px-4 py-12 sm:px-6 lg:px-8">
            <h2 className="mb-8 ml-4 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
              Roadmap
            </h2>
            <ol className="relative flex flex-col items-start border-s w-full border-violet-500 dark:border-violet-500">
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
      <div className=" flex flex-col items-start gap-4 px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 ml-4 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
          Roadmap
        </h2>
        <ol className="relative flex flex-col items-start border-s w-full border-neutral-200 dark:border-neutral-700">
          {roadmap.toSorted((a, b) => a.id - b.id).map((item) => {
            return (
              <RoadmapBlock key={item.id} title={item.title} date={item.date}>
                {item.description}
              </RoadmapBlock>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
