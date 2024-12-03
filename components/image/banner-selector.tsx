"use client";

import { getBannerUrlWithFallback } from "@/app/(sidebar)/class/actions";
import { ImageCropper } from "@/components/image/banner-cropper";
import Image from "next/image";
import React, { useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Skeleton } from "../ui/skeleton";

export type FileWithPreview = FileWithPath & {
    preview: string;
};

const accept = {
    "image/*": [],
};

export function BannerCropperComponent({ classId }: { classId: string }) {
    const [selectedFile, setSelectedFile] =
        React.useState<FileWithPreview | null>(null);
    const [isDialogOpen, setDialogOpen] = React.useState(false);
    const [url, setUrl] = React.useState<string | null>(null);
    useEffect(() => {
        getBannerUrlWithFallback("banner", classId).then((res) => {
            setUrl(res);
        });
    }, [classId]);
    const onDrop = React.useCallback((acceptedFiles: FileWithPath[]) => {
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
    }, []);

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
                    type="banner"
                />
            ) : (
                <div {...getRootProps()} className="flex ">
                    <input {...getInputProps()} />
                    {url ? (
                        <Image
                            className="aspect-[41/16] w-full max-w-lg rounded-md border border-border object-cover object-center"
                            src={url}
                            unoptimized
                            alt="Class banner"
                            width={410}
                            height={160}
                        />
                    ) : (
                        <Skeleton className="aspect-[41/16] h-48 w-full max-w-lg rounded-md border border-border object-cover object-center" />
                    )}
                </div>
            )}
        </div>
    );
}
