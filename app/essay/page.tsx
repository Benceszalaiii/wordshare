import React from "react";
import { EssayList } from "@/components/essaylist";

export default function Page() {
  return (
    <div className="p-4 dark:text-white md:p-32">
      <h1 className="my-12 text-2xl font-bold">All essays</h1>
      <EssayList />
    </div>
  );
}