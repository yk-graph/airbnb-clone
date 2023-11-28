'use client'

import { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { BiDollar } from 'react-icons/bi'

interface Props {
  id: string
  label: string
  type?: string
  disabled?: boolean
  formatPrice?: boolean
  required?: boolean
  register: UseFormRegister<FieldValues> // [Tips] 親コンポーネントから渡ってきたreact-hook-formのregisterに型を定義する方法
  errors: FieldErrors // [Tips] 親コンポーネントから渡ってきたreact-hook-formのerrorsに型を定義する方法
}

const Input: FC<Props> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })} // [Tips] react-hook-form の register を使用してinput要素を登録する方法（https://react-hook-form.com/docs/useform/register）
        placeholder=" "
        type={type}
        // [Tips] errors[id] -> react-hook-form の errors の中に該当のkey名でエラーがあるかどうか判定する方法
        className={`
          peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'} 
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} 
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <label
        className={`
          absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  )
}

export default Input
