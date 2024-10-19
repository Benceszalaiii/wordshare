import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  // GET FILE
  const classId = params.classId;
  if (!classId) {
    const placeholder = await fetch("https://placehold.co/600x400/png?text=C");
    return new Response(null, { status: 404 });
  }
  const res = supabase.storage.from("class").getPublicUrl(`${classId}/icon`);
  const imageFetch = await fetch(res.data.publicUrl);
  if (!imageFetch.ok) {
    const placeholder = await fetch("https://placehold.co/600x400/png?text=C");
    return new Response(null, { status: 201 });
  }
  const image = await imageFetch.blob();
  return new Response(image, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { classId: string } },
) {
  const icon = await req.blob();
  const classId = params.classId;
  if (!icon) {
    return new Response("No file provided", { status: 418 });
  }
  if (!classId) {
    return new Response("No classId provided", { status: 418 });
  }
  const res = await supabase.storage
    .from("class")
    .upload(`${classId}/icon`, icon, { upsert: true });
  return new Response(`Successfully changed icon`, { status: 200 });
  // const res = await supabase.storage.from("class").upload(`${classId}/icon`, icon, {upsert: true});
  // return new Response(`Successfully uploaded icon`, {status: 200})
}
