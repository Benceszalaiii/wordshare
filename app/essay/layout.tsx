import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { SignInButton } from "@/components/shared/buttons";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerSession(authOptions);
  const authenticate = () => {
    return (
      <>
      Make sure you are logged in.
      <SignInButton session={auth} />
      </>
    );
  };
  const user = auth?.user;
  return <div className="flex flex-col">{children}</div>;
}
