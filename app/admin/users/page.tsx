"use server";
import "server-only";

import { columns } from "./columns"
import { User } from "@prisma/client"
import { DataTable } from "./data-table"
import { getAllUsers } from "@/lib/db";
import { Suspense } from "react";

async function getData(): Promise<User[]> {
  const response = await getAllUsers();
  return response;
}

export default async function Page() {
  const data = await getData()
  return (
    <div className="container mx-auto py-2 md:py-10">
      <h1 className="text-2xl mb-6 font-bold">Users</h1>
      <Suspense>
      <DataTable columns={columns} data={data} />
      </Suspense>
    </div>
  )
}
