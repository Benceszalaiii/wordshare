import { LoadingCircle, LoadingDots, LoadingSpinner } from "./shared/icons";
export function Loading({ method }: { method: "circle" | "dots" | "spinner" }) {
    
    return (
        <>
            {method === "circle" && <LoadingCircle className="h-12 w-12" />}
            {method === "dots" && <LoadingDots className="h-12 w-12" />}
            {method === "spinner" && <LoadingSpinner className="h-12 w-12" />}
        </>
    );
}
