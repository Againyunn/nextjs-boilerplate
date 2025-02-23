"use client";

import { useEffect, useRef, useState } from "react";

import { useToast } from "utils/toast/ToastContext";
import { v4 as uuidv4 } from "uuid";

export interface FileUploadProps {
  multiple?: boolean;
  /** upload 비활성화 여부 지정 */
  disabled?: boolean;

  onChange: (files: File[]) => void;
  classes?: string;
}

export interface FileState {
  file: File;
  name: string;
  password: string | null;
  isChanging: boolean;
  isIncluded: boolean;
}

const FileUpload = ({
  multiple,
  disabled,
  onChange,
  classes,
}: FileUploadProps) => {
  const toast = useToast();

  const maxAttachmentCount = 15;

  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const [uploadFiles, setUploadFiles] = useState<FileState[]>([]);

  const handleChangeUploadFiles = (files: File[]): void => {
    if (uploadFiles.length + files.length > maxAttachmentCount) {
      toast.toastMsg(
        uuidv4(),
        `파일은 최대 ${maxAttachmentCount}개까지 업로드 가능합니다.`,
        "error"
      );

      return;
    }

    const changeUploadFiles: FileState[] = files.map((file) => {
      return {
        file: file,
        name: file.name,
        password: null,
        isChanging: false,
        isIncluded: false,
      };
    });

    setUploadFiles((prevFiles) => [...prevFiles, ...changeUploadFiles]);
  };

  useEffect(() => {
    if (uploadFiles.length > 0) {
      onChange(uploadFiles.map((file) => file.file));
    }
  }, [uploadFiles]);

  return (
    <input
      className={classes}
      title="파일업로드"
      placeholder="파일업로드"
      multiple={multiple}
      type="file"
      ref={fileUploadInputRef}
      onChange={(evt) =>
        evt.target.files &&
        handleChangeUploadFiles(Array.from(evt.target.files))
      }
      disabled={disabled}
    ></input>
  );
};

export default FileUpload;
