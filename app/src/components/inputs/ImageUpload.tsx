/*
  [Tips] cloudinaryを使って画像をアップロードする方法
  https://next.cloudinary.dev/clduploadwidget/basic-usage
*/

'use client'

import { useCallback } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  onChange: (value: string) => void
  value: string
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  // [Tips] CldUploadWidget のコンポーネントの onUpload で返ってくる値を result として受け取る（返却値の中身はオブジェクトで info というキーに入っている https://next.cloudinary.dev/clduploadwidget/configuration#results）
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange]
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      //　オプションの指定 =-> https://next.cloudinary.dev/clduploadwidget/configuration#options
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  fill
                  style={{ objectFit: 'cover' }}
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
