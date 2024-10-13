import { AltNav } from "@/components/alt-nav";


export const metadata = {
  title: "Essay"
}
export default async function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AltNav className="mb-4" items={[
        { title: "View Essays", path: "/essay"},
        { title: "Write Essay", path: "/essay/write"},
      ]} />
      {children}
    </>
  );
}
