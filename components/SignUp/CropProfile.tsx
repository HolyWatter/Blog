import { useRef, useState } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

interface Props {
  img: string | undefined
  setProfileImg: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function CropProfile({ img, setProfileImg }: Props) {
  const cropperRef = useRef(null)

  const onCrop = () => {
    const imageElement: any = cropperRef?.current
    const cropper = imageElement?.cropper
    setProfileImg(cropper.getCroppedCanvas().toDataURL())
  }

  return (
    <div>
      <Cropper src={img} ref={cropperRef} crop={onCrop} />
    </div>
  )
}
