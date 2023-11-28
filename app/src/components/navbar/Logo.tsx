'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
  const router = useRouter()

  return (
    <Image
      onClick={() => router.push('/')}
      alt="Logo"
      className="hidden md:block cursor-pointer" // [Tips] レスポンシブで表示・非表示を切り替える場合はhiddenクラスを使用する
      height="100"
      width="100"
      src="/images/airbnb.svg"
    />
  )
}

export default Logo
