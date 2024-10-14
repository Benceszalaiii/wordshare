import Link from "next/link";

export default function Page(){
    return(
        <div className="flex flex-col gap-8 justify-center w-full items-center">
        <h1 className="text-2xl">Download content for physics</h1>
        <Link href={"/tsunami.pptx"} className="underline hover:text-red-500">Download the PPTX file</Link>
        <Link href={"/tsunami.docx"} className="underline hover:text-sky-500">Download the DOCX file</Link>
        </div>
    )
}