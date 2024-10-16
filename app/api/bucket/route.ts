import { uploadFile } from "@/lib/supabase";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const result = uploadFile();
  return result;
}
