import { Fingerprint, FingerprintIcon, LockKeyhole } from "lucide-react"
import { SignInButton } from "./shared/buttons"

export const notAuthorized = (name: string)=> {
    return (
        <section className="flex flex-col gap-4 items-center w-full mt-12 justify-center">
            <Fingerprint size={64} strokeWidth={1} className="my-12" />
        <h1 className="text-lg font-bold text-center text-wrap">To access {name}, you must be authenticated</h1>
        <SignInButton session={null}></SignInButton>
        </section>
    )
}