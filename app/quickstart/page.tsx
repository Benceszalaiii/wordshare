import { getServerSession } from "next-auth";
import { caveat } from "../fonts";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { changeRoleById, getUserByEmail, getUserById } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RoleForm } from "@/components/quickstart/role-form";
import { VerifyRequest } from "@/components/quickstart/teacherverification";

const styling = {
  section: "flex flex-col gap-2 items-center pt-12",
  h1: "text-2xl font-serif mb-8",
  completed: "font-serif text-lg text-neutral-400",
  active: "font-serif text-lg",
};

export default async function Page() {
  // return (<>
  // This page is work in progress. Make sure to check back later.
  // </>)
  const auth = await getServerSession(authOptions);
  const user = auth?.user;
  if (!user?.id) {
    return (
      <section className={styling.section}>
        <h1 className={styling.h1}>
          Get started with{" "}
          <span className={`${caveat.className}`}>WordShare</span>
        </h1>
        <p className={styling.active}>
          1. Authenticate using Google.
        </p>
        <SignInButton session={auth} />
      </section>
    );
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser?.role || (dbUser.role !== "teacher" && dbUser.role !== "student")) {
    return (
      <section className={styling.section}>
        <h1 className={styling.h1}>
          Get started with{" "}
          <span className={`${caveat.className}`}>WordShare</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className={styling.completed}>1. Authenticate with Google ✅ </p>
          <p className={styling.active}>2. Choose account type</p>
        </div>
        <RoleForm />
      </section>
    );
  }
  if (dbUser.role === "teacher" && !dbUser.teacherVerified) {
    return (
      <section className={styling.section}>
        <h1 className={styling.h1}>
          Get started with{" "}
          <span className={`${caveat.className}`}>WordShare</span>
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className={styling.completed}>1. Authenticate with Google ✅ </p>
          <p className={styling.completed}>2. Choose account type ✅</p>
          <p className={styling.active}>3. Verification submitted</p>
        </div>
        <p>You are set up for now. Wait for our team to verify you.</p>
      </section>
    );
  }
  if (dbUser.role === "student") {
  return(
  <section className={styling.section}>
  <h1 className={styling.h1}>
    Get started with{" "}
    <span className={`${caveat.className}`}>WordShare</span>
  </h1>
  <div className="flex flex-col items-center gap-2">
    <p className={styling.completed}>1. Authenticate with Google ✅ </p>
    <p className={styling.completed}>2. Choose account type ✅</p>
    <p className={styling.active}>3. Join class</p>
  </div>
  <p>You are set up for now.</p>
</section>
);}
}
