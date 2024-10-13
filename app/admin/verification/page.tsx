"use server";
import "server-only";

import { columns } from "./columns";
import { User } from "@prisma/client";
import { DataTable } from "./data-table";
import { getVerifyRequests } from "@/lib/db";
import { Suspense } from "react";

async function getData(): Promise<User[]> {
  const response = await getVerifyRequests();
  return response;
}

export default async function Page() {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-2xl font-bold">Verification Requests</h1>
      <Suspense>
        <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  );
}
