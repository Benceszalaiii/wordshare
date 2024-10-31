"use server"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { SignInButton } from "../shared/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
export async function AlertWrongAccount() {
    const session = await getServerSession(authOptions);
    return (
        <AlertDialog defaultOpen>
            <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        The invite you are trying to access is for a different account.
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Please sign in to the correct account to access this invite.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild><Link href={`/invites`}>Cancel</Link></AlertDialogCancel>
                    <AlertDialogAction asChild><SignInButton session={session} /></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
