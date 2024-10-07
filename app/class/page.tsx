import { SignInButton } from "@/components/shared/buttons";
import { getUserById } from "@/lib/db";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function Page(){
    const auth = await getServerSession(authOptions);
    const user = auth?.user;
    if (!user?.id){
        console.log(auth);
        return (
            <>
                <h1>Not authenticated</h1>
                <SignInButton session={auth}></SignInButton>
            </>
        );
    }
    const dbUser = await getUserById(user.id);
    if (!dbUser){
        console.log("User not found");
        return <h1>User not found in database. <br /> This might be a problem from our side.</h1>;
    }
    return(
        <>
            <h1>Authenticated</h1>
            <h2>{dbUser.name}</h2>
            <h3>{dbUser.email}</h3>
        </>
    )
}