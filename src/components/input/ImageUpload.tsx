import { useRef, useState } from "react";
import { Button } from "../ui/button";

import ImageNotFound from "@/assets/image-notfound.png";
import { FaEdit } from "react-icons/fa";

interface IImageUpload {
  onChange?: (file: File | null) => void;
  value?: string;
}

export default function ImageUpload({ onChange, value }: IImageUpload) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(selectedFile);
        setPreviewUrl(imageUrl);
        onChange?.(selectedFile);
      } else {
        setPreviewUrl(null);
        onChange?.(null);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).click();
    }
  };

  return (
    <>
      <div className="flex relative justify-center items-center flex-wrap">
        <div className="relative ">
          <img
            alt="Uploaded"
            src={previewUrl || value || ImageNotFound}
            className="object-cover w-56 rounded-xl"
          />

          <Button
            type="button"
            className="absolute -right-2 -bottom-2"
            onClick={handleClick}
          >
            <FaEdit />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}

          // className="file-input file-input-bordered file-input-sm bg-gray-200 text-gray-500 cursor-default"
        />
      </div>
    </>
  );
}
