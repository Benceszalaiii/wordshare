import { EssayNav } from "@/components/essay/nav";


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
      <EssayNav className="mb-4" items={[
        { title: "View Essays", path: "/essay"},
        { title: "Write Essay", path: "/essay/write"},
      ]} />
      {children}
    </>
  );
}
