import { SignInButton } from "./shared/buttons"

export const notAuthorized = (name: string)=> {
    return (
        <section className="flex flex-col gap-4 items-center justify-center">
        <h1>To access {name}, you must be authenticated</h1>
        <SignInButton session={null}></SignInButton>
        </section>
    )
}