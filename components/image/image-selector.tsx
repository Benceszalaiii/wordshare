"use client";

import {
    getBannerUrlWithFallback,
    getBannerWithFallback,
} from "@/app/(sidebar)/class/actions";
import { ImageCropper } from "@/components/image/icon-cropper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import LoaderSpinner from "../loader/spinner";

export type FileWithPreview = FileWithPath & {
    preview: string;
};

const accept = {
    "image/*": [],
};

export function CropperComponent({ classId }: { classId: string }) {
    const [url, setUrl] = React.useState<string>("");
    React.useEffect(() => {
        const fetchClassIcon = async () => {
            const res = await getBannerUrlWithFallback("icon", classId);
            setUrl(res);
        };
        fetchClassIcon();
    }, [classId]);
    const [selectedFile, setSelectedFile] =
        React.useState<FileWithPreview | null>(null);
    useEffect(() => {
        const fetchClassIcon = async () => {
            const res = await JSON.parse(
                await getBannerWithFallback("icon", classId),
            );
            setSelectedFile(res.blob as FileWithPreview);
        };
    }, [classId]);
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    const onDrop = React.useCallback(
        (acceptedFiles: FileWithPath[]) => {
            const file = acceptedFiles[0];
            if (!file) {
                alert("Selected image is too large! Maximum size is 8MB.");
                return;
            }

            const fileWithPreview = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            setSelectedFile(fileWithPreview);
            setDialogOpen(true);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept,
    });

    return (
        <div className="relative ">
            {selectedFile ? (
                <ImageCropper
                    dialogOpen={isDialogOpen}
                    setDialogOpen={setDialogOpen}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    classId={classId}
                />
            ) : (
                <Avatar {...getRootProps()} className="size-36 cursor-pointer">
                    <input {...getInputProps()} />
                    <AvatarImage src={url} alt="Class icon" />
                    <AvatarFallback>
                        <LoaderSpinner text variation="normal" />
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
