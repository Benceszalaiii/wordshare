"use client";
import { Session } from "next-auth";
import { useSignInModal } from "../layout/sign-in-modal";
import UserDropdown from "../layout/user-dropdown";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
export function SignInButton({ session, signInText, signOutText, className }: { session: Session | null, signInText?: string, signOutText?: string, className?: string }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
    <SignInModal />
      {session ? (
        <Button variant={"destructive"} onClick={() => {signOut()}} className="">{signOutText ? signOutText :"Sign out"}</Button>
        
      ) : (
        <Button
        variant={"outline"}
          className={className}
          onClick={() => setShowSignInModal(true)}
        >
          {signInText ? signInText :"Sign In"}
        </Button>
      )}
    </>
  );
}
