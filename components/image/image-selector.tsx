"use client";

import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageCropper } from "@/components/image/icon-cropper";
import { FileWithPath, useDropzone } from "react-dropzone";

export type FileWithPreview = FileWithPath & {
  preview: string;
};

const accept = {
  "image/*": [],
};

export function CropperComponent({ classId }: { classId: string }) {
  const [selectedFile, setSelectedFile] =
    React.useState<FileWithPreview | null>(null);
  useEffect(() => {
    const fetchClassIcon = async () => {
      const res = await fetch(`/class/icons/${classId}`);
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
        <Avatar
          {...getRootProps()}
          className="size-36 cursor-pointer ring-2 ring-slate-200 ring-offset-2"
        >
          <input {...getInputProps()} />
          <AvatarImage src={`/class/icons/${classId}`} alt="Class icon" />
          <AvatarFallback>C</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
