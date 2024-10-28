"use client";

import React, { useEffect } from "react";
import { ImageCropper } from "@/components/image/banner-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [],
};

export function BannerCropperComponent({ classId }: { classId: string }) {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  useEffect(() => {
    const fetchClassIcon = async () => {
      const res = await fetch(`/class/banners/${classId}`);
      setSelectedFile((await res.blob()) as FileWithPreview);
    };
  }, [classId]);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0];
      if (!file) {
        alert("Selected image is too large!");
        return;
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      setSelectedFile(fileWithPreview);
      setDialogOpen(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [classId],
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
          type="banner"
        />
      ) : (
        <div {...getRootProps()} className="flex ">
          <input {...getInputProps()} />
          <Image
            className="aspect-[41/16] w-full max-w-lg rounded-md border border-border object-cover object-center"
            src={`/class/banners/${classId}`}
            alt="Class banner"
            width={410}
            height={160}
          />
        </div>
      )}
    </div>
  );
}
