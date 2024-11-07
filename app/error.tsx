"use client"; // Error boundaries must be Client Components

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="no-scrollbar m-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden p-0 text-center">
            <h2 className="text-lg">Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}
