'use client'

import Image from 'next/image'
import { FC } from 'react'

interface Props {
  src: string | null | undefined
}

const Avatar: FC<Props> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || '/images/placeholder.png'}
    />
  )
}

export default Avatar
