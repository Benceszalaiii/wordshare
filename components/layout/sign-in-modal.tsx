import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import React from "react";
const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 dark:md:border-main-950">
        <div className="flex flex-col items-center justify-center space-y-3 border-gray-200 bg-white  dark:bg-black dark:border-main-900 px-4 py-6 pt-8 text-center md:px-16">

          <h3 className="font-display text-2xl font-bold dark:text-white">Sign In</h3>
          <p className="text-sm text-gray-500 dark:text-white">
            Please sign in using the one of the following options
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 dark:bg-black  px-4 py-8 md:px-16">
          <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-900 dark:bg-black text-gray-400 dark:text-white"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-main-900  dark:bg-black dark:text-white dark:hover:bg-main-800"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-xl border  text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Google className="h-5 w-5" />
                <p>Sign In with Google</p>
              </>
            )}
          </button>
          {/* <button
            disabled={signInClicked}
            className={`${
              signInClicked
                ? "cursor-not-allowed border-gray-200 bg-gray-100 dark:border-gray-900 dark:bg-black text-gray-400 dark:text-white"
                : "border border-gray-200 bg-white text-black hover:bg-gray-50 dark:border-main-900  dark:bg-black dark:text-white dark:hover:bg-main-800"
            } flex h-10 w-full items-center justify-center space-x-3 rounded-xl border  text-sm shadow-sm transition-all duration-75 focus:outline-none`}
            onClick={() => {
              setSignInClicked(true);
              signIn("spotify");
            }}
          >
            {signInClicked ? (
              <LoadingDots color="#808080" />
            ) : (
              <>
                <Spotify className="h-5 w-5" />
                <p>Sign In with Spotify</p>
              </>
            )}
          </button> */}
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
