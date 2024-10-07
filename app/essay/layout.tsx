import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerSession();
  const authenticate = () => {
    "use server";
    return signIn("google", { callbackUrl: new URL("/words").href });
  };
  const user = auth?.user;
  if (!user) {
    console.log("Not authenticated");
    authenticate();
  }
  console.log("Authenticated");
  return <div className="flex flex-col">{children}</div>;
}
