import { LoadingCircle } from "@/components/shared/icons";

export default function Loading() {
    return (
        <div className="fixed left-0 top-0 z-50 m-0 flex h-full w-full flex-col items-center justify-center bg-black/15 p-0 backdrop-blur-sm">
            <LoadingCircle className="h-12 w-12" />
        </div>
    );
}
