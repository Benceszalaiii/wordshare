import { ImageResponse } from 'next/og'
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
export const alt = 'WordShare'
export const size = {
  width: 1200,
  height: 630,
}


export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  const fontFetch = fetch(new URL("/fonts/Caveat.ttf", process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000')).then((res) => res.arrayBuffer());
  const fontData = await fontFetch;
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'rgb(79 70 229)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Caveat',
        }}
      >
        WordShare
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      fonts: [
        {
          name: "Caveat",
          data: fontData,
          weight: 700,
          style: "normal"
        }
      ]
    }
  )
}