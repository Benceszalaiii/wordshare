import { ImageResponse } from 'next/og'
import * as ImageComponent from "next/image";
// Image metadata
export const runtime = "edge";

export const alt = 'WordShare'
export const size = {
  width: 1200,
  height: 630,
}


export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  const fontFetch = await fetch(new URL("./Caveat.ttf", import.meta.url));
  const fontData = await fontFetch.arrayBuffer();
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
      emoji: "fluentFlat",
      fonts: [
        {
          data: fontData,
          name: "Caveat",
          weight: 700
        }
      ]
    }
  )
}