import { LoadingCircle } from "@/components/shared/icons"

export default function Loading(){
    return (
        <div className="w-full h-full fixed z-50 bg-black/15 m-0 p-0 left-0 top-0 backdrop-blur-sm flex flex-col items-center justify-center">
            <LoadingCircle className="w-12 h-12" />
        </div>
    )
}