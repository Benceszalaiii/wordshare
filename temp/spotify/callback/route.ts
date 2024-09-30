import { btoa } from "buffer";
import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const redirectUri = "http://localhost:3000/api/spotify/callback";
  const clientId = process.env.SPOTIFY_CLIENT_ID || "0";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "0";
  if (clientId === "" || clientSecret === "") {
    return Response.json({
      error: "Missing Spotify Client ID or Client Secret",
    });
  }
  if (state === null) {
    return Response.redirect(
      "/#" + new URLSearchParams({ error: "state_mismatch" }),
    );
  }

}
