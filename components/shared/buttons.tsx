"use client";
import { Session } from "next-auth";
import { useSignInModal } from "../layout/sign-in-modal";
import UserDropdown from "../layout/user-dropdown";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
export function SignInButton({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
    <SignInModal />
      {session ? (
        <Button variant={"destructive"} onClick={() => {signOut()}} className="">Sign out</Button>
        
      ) : (
        <Button
        variant={"outline"}
          className=""
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </Button>
      )}
    </>
  );
}
