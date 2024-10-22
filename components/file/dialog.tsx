"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { BookType } from "./sidebar";
import ReactAudioPlayer from "react-audio-player";
import { decodeSectionTitle } from "@/lib/utils";

export default function AudioDialog({
    currentBook,
    audioFile,
    section,
}: {
    className?: string;
    currentBook: BookType;
    section: string;
    audioFile: string;
}) {
    const getName = ()=> {
        if(section.startsWith("ce") || section.startsWith("pe") || section.startsWith("rc")) {
            return decodeSectionTitle(section)
        }
        return `File ${section}`
    }
    return (
        <>
            <Dialog>
                <DialogTrigger>{audioFile}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{getName()}: <span className="font-normal ml-2"> {audioFile}</span></DialogTitle>
                        <DialogDescription>
                            <ReactAudioPlayer
                                className="h-16 w-full"
                                controls
                                volume={0.5}
                                src={`/englishfile/${currentBook.bookId}/${section}/${audioFile}.mp3`}
                            ></ReactAudioPlayer>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
