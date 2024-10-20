import { getClassById, getUserById } from "@/lib/db";
import { ImageResponse } from "next/og";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export const dynamic = "force-dynamic";
export const runtime = "edge";
export const alt = "WordShare";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  // Font
  const currentClass = await getClassById(params.id);

  if (!currentClass) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div tw="flex bg-black text-white pb-12 flex-col max-h-full w-full h-full items-center justify-center gap-4">
        <img src={`https://wordshare.tech/opengraph-image.png`} width={1000} height={500} alt={"WordShare"} />
        <h1 tw="font-bold font-caveat">Join a class today</h1>
        <p>Get started now!</p>
      </div>
      ),
      // ImageResponse options
      {
        ...size,
      },
    );
  }
  const author = await getUserById(currentClass.teacherUserId);
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="flex bg-black text-white pb-12 flex-col w-full h-full items-center justify-center gap-4">
        <img src={`https://xhzwexjdzphrgjiilpid.supabase.co/storage/v1/object/public/class/${currentClass.id}/banner`} width={1200} tw="aspect-[21/9]" alt={currentClass.name.slice(0, 3)} />
        <h1 tw="font-bold font-caveat">{currentClass.name}</h1>
        <p>Class by {author?.name || "unknown"}</p>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    },
  );
}
