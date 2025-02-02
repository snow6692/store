"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { config } from "@/lib/config";

interface IProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  type: "standard" | "profile" | "cover";
  dontShowPreview?: boolean;
}

function ImageUpload({
  onChange,
  onRemove,
  type,
  value,
  disabled,
  dontShowPreview,
}: IProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    console.log(result);
    onChange(result.info.secure_url);
  };

  if (type === "profile") {
    return (
      <div className="relative inset-x-96 size-52 rounded-full border-2 border-white bg-gray-200 shadow-2xl">
        {value.length > 0 && (
          <Image
            src={value[0]}
            alt="Profile image"
            width={300}
            height={300}
            className="absolute bottom-0 left-0 right-0 top-0 size-52 rounded-full object-cover"
          />
        )}
        <CldUploadWidget
          uploadPreset={config.cloudinaryPresetName}
          onSuccess={onUpload}
        >
          {({ open }) => {
            if (!open) {
              console.error("CldUploadWidget did not load properly.");
              return null;
            }

            const onClick = () => {
              if (open) {
                open();
              } else {
                console.error("Open function is undefined.");
              }
            };

            return (
              <>
                <button
                  type="button"
                  className="from-blue-primary absolute bottom-6 right-0 z-20 flex h-14 w-14 items-center justify-center rounded-full border-none bg-gradient-to-t to-blue-300 text-[17px] font-medium text-white shadow-lg hover:shadow-md active:shadow-sm"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <svg
                    viewBox="0 0 640 512"
                    fill="white"
                    height="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                </button>
              </>
            );
          }}
        </CldUploadWidget>
      </div>
    );
  } else {
    return <div></div>; // Ensuring there's a return value for the "else" case
  }
}

export default ImageUpload;
