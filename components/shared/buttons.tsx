"use client";
import { Session } from "next-auth";
import { useSignInModal } from "../layout/sign-in-modal";
import UserDropdown from "../layout/user-dropdown";
export function SignInButton({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  return (
    <>
    <SignInModal />
      {session ? (
        <UserDropdown session={session} />
        
      ) : (
        <button
          className="rounded-full border px-10 py-3 border-black font-bold bg-white text-black text-sm  transition-all hover:bg-white hover:text-black dark:hover:bg-neutral-800 dark:hover:text-white"
          onClick={() => setShowSignInModal(true)}
        >
          Sign In
        </button>
      )}
    </>
  );
}
