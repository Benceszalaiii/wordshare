"use server";
import "server-only";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
