import { Fingerprint } from "lucide-react";
import { SignInButton } from "./shared/buttons";

export const notAuthorized = (name: string) => {
    return (
        <section className="mt-12 flex w-full flex-col items-center justify-center gap-4">
            <Fingerprint size={64} strokeWidth={1} className="my-12" />
            <h1 className="text-wrap text-center text-lg font-bold">
                To access {name}, you must be authenticated
            </h1>
            <SignInButton session={null}></SignInButton>
        </section>
    );
};
