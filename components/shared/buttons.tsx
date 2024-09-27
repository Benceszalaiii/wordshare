"use client";
import { Session } from "next-auth";
import { useSignInModal } from "../layout/sign-in-modal";
import UserDropdown from "../layout/user-dropdown";
import { signOut } from "next-auth/react";
export function SignInButton({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
    <SignInModal />
      {session ? (
        <button onClick={() => {signOut()}} className="rounded-full border px-10 py-3 border-black font-bold bg-white text-black text-sm  transition-all hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white">Sign out</button>
        
      ) : (
        <button
          className="rounded-full border px-10 py-3 border-black dark:border-white dark:text-light font-bold bg-transparent transition-all duration-300 hover:text-gray-500 hover:border-gray-600 text-black text-sm hover:bg-white  dark:hover:bg-neutral-800 dark:hover:text-white"
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </button>
      )}
    </>
  );
}
