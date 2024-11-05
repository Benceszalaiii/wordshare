"use client";
import { Session } from "next-auth";
import SignInModal from "../layout/signinmodal";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
export function SignInButton({ session, signInText, signOutText, className }: { session: Session | null, signInText?: string, signOutText?: string, className?: string }) {

  return (
    <>
      {session ? (
        <Button variant={"destructive"} onClick={() => {signOut()}} className="">{signOutText ? signOutText :"Sign out"}</Button>
      ) : (
        <SignInModal/>
      )}
    </>
  );
}
