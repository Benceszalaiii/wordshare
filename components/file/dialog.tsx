"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { decodeSectionTitle } from "@/lib/utils";
import ReactAudioPlayer from "react-audio-player";
import { BookType } from "./sidebar";

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
    const getName = () => {
        if (
            section.startsWith("ce") ||
            section.startsWith("pe") ||
            section.startsWith("rc")
        ) {
            return decodeSectionTitle(section);
        }
        return `File ${section}`;
    };
    return (
        <>
            <Dialog>
                <DialogTrigger>{audioFile}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {getName()}:{" "}
                            <span className="ml-2 font-normal">
                                {" "}
                                {audioFile}
                            </span>
                        </DialogTitle>
                        <DialogDescription>
                            <ReactAudioPlayer
                                className="h-16 w-full"
                                controls
                                volume={0.5}
                                src={`https://wordshareaudio.s3.eu-central-1.amazonaws.com/englishfile/${currentBook.bookId}/${section}/${audioFile}.mp3`}
                            ></ReactAudioPlayer>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
