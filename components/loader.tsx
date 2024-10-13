import { LoadingCircle, LoadingDots, LoadingSpinner } from "./shared/icons"
export function Loading({method}: {method: "circle" | "dots" | "spinner"}){
    return (
        <>
            {method === "circle" && <LoadingCircle className="w-12 h-12" />}
            {method === "dots" && <LoadingDots className="w-12 h-12" />}
            {method === "spinner" && <LoadingSpinner className="w-12 h-12" />}
        </>
    )
}