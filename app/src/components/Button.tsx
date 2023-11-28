'use client'

import { FC } from 'react'
import { IconType } from 'react-icons'

interface Props {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  outline?: boolean
  small?: boolean
  icon?: IconType // [Tips] react-iconsのiconをPropsで受け取る時にIconTypeを使用する方法
}

const Button: FC<Props> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon, // [Tips] Propsで受け取ったiconをコンポーネント内でIconとして使用する方法
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      // [Tips] 動的にCSSを変更する方法
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  )
}

export default Button
