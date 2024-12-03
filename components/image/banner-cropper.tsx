"use client";

import React, { type SyntheticEvent } from "react";

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    type Crop,
    type PixelCrop,
} from "react-image-crop";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";

import { getBannerWithFallback, uploadImage } from "@/app/(sidebar)/class/actions";
import { FileWithPreview } from "@/components/image/image-selector";
import { CropIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "sonner";

interface ImageCropperProps {
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFile: FileWithPreview | null;
    setSelectedFile: React.Dispatch<
        React.SetStateAction<FileWithPreview | null>
    >;
    classId: string;
    type: "icon" | "banner";
}

export function ImageCropper({
    dialogOpen,
    // eslint-disable-next-line react/prop-types
    setDialogOpen,
    selectedFile,
    // eslint-disable-next-line react/prop-types
    setSelectedFile,
    classId,
    type,
}: ImageCropperProps) {
    const aspect = 41 / 16;

    const imgRef = React.useRef<HTMLImageElement | null>(null);

    const [crop, setCrop] = React.useState<Crop>();
    const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>("");
    const [croppedImage, setCroppedImage] = React.useState<string>("");

    function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    function onCropComplete(crop: PixelCrop) {
        if (imgRef.current && crop.width && crop.height) {
            const croppedImageUrl = getCroppedImg(imgRef.current, crop);
            setCroppedImageUrl(croppedImageUrl);
        }
    }

    function getCroppedImg(image: HTMLImageElement, crop: PixelCrop): string {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;

        const ctx = canvas.getContext("2d");

        if (ctx) {
            ctx.imageSmoothingEnabled = false;

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY,
            );
        }

        return canvas.toDataURL("image/png", 1.0);
    }

    async function onCrop() {
        try {
            setCroppedImage(croppedImageUrl);
            setDialogOpen(false);

            if (type === "icon") {
                const res = await uploadImage(croppedImageUrl, classId, "icon");
                if (res.status === 200) {
                    toast.success(
                        "Successfully uploaded. It may take a few minutes to update.",
                    );
                } else {
                    toast.error("Something went wrong! " + res.message);
                }
            }
            if (type === "banner") {
                const res = await uploadImage(
                    croppedImageUrl,
                    classId,
                    "banner",
                );
                if (res.status === 200) {
                    toast.success(
                        "Successfully uploaded. It may take a few minutes to update.",
                    );
                } else {
                    toast.error("Something went wrong! " + res.message);
                }
            }
        } catch (error) {
            toast.error("Something went wrong! " + error);
        }
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Image
                    width={410}
                    height={160}
                    className="aspect-[41/16] w-full max-w-lg cursor-pointer rounded-md border border-border"
                    src={
                        croppedImage
                            ? croppedImage
                            : selectedFile?.preview || ""
                    }
                    alt="Banner"
                />
            </DialogTrigger>
            <DialogContent className="gap-0 p-0">
                <div className="size-full p-6">
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => onCropComplete(c)}
                        aspect={aspect}
                        className="w-full"
                    >
                        <Image
                            ref={imgRef}
                            className="size-full rounded-none "
                            alt="Image Cropper Shell"
                            src={selectedFile?.preview || ""}
                            width={410}
                            height={160}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                </div>
                <DialogFooter className="justify-center p-6 pt-0 ">
                    <DialogClose asChild>
                        <Button
                            size={"sm"}
                            type="reset"
                            className="w-fit"
                            variant={"outline"}
                            onClick={async () => {
                                const res = await JSON.parse(
                                    await getBannerWithFallback(
                                        "icon",
                                        classId,
                                    ),
                                );
                                setSelectedFile(res.blob as FileWithPreview);
                            }}
                        >
                            <Trash2Icon className="mr-1.5 size-4" />
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="submit"
                        size={"sm"}
                        className="w-fit"
                        onClick={onCrop}
                    >
                        <CropIcon className="mr-1.5 size-4" />
                        Crop
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Helper function to center the crop
export function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
): Crop {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 50,
                height: 50,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}
