"use server";
import { headers } from "next/headers";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/spotify/callback";
  const state = nanoid(16);
  const scopes = "playlist-read-private playlist-read-collaborative user-read-playback-state user-read-currently-playing user-read-recently-played user-read-playback-position user-top-read".replaceAll(" ", "%20");
  const linkToFetch = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}&state=${state}`;
  return Response.redirect(linkToFetch);
}
