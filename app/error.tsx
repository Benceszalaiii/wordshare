'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
      <div className="w-full h-screen flex p-0 m-0 no-scrollbar flex-col justify-center items-center text-center overflow-hidden">
        <h2 className="text-lg">Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </div>

  )
}