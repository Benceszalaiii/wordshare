import { User } from "@prisma/client";

export async function VerifyRequest({user}: {user: User}){
    return (<>
        This page is work in progress. Make sure to check back later.
        <p> Your current status is {user.role}</p>
    </>)
}