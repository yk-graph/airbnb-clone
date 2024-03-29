/* 
  [Tips] react-hook-formを使用してフォームの入力値を管理する方法
  新規登録ページの入力値の管理・APIへのPOSTリクエストはこのコンポーネントで管理
  */

'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from './Modal'

const RegisterModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [isLoading, setIsLoading] = useState(false) // loading状態がtrueの時はボタンをdisabledにする

  // [Tips] react-hook-form の useForm を使用デフォルトの値を設定する方法
  const {
    register, // [Tips] react-hook-form の register を使用してinput要素を登録する方法（https://react-hook-form.com/docs/useform/register）
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // [Tips] react-hook-form の SubmitHandler を使用してフォームの入力値を取得（data として受け取る）してPOSTリクエストを送信する方法
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    await axios
      .post('/api/register', data)
      // [Tips] 新規登録が成功したらログインする方法
      .then(() => {
        return signIn('credentials', {
          ...data,
          redirect: false,
        })
      })
      .then((callback) => {
        if (callback?.ok) {
          toast.success('Registered!')
          router.refresh() // [Tips] サーバーからデータをfetchし直すテクニック
          registerModal.onClose()
        }
      })
      .catch((error) => {
        // [Tips] throw されたメッセージがある場合は表示させる制御方法
        if (error.response.data) {
          toast.error(error.response.data)
        } else {
          toast.error('Something went wrong!')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggle = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  // [Tips] return外で定義した変数をJSX内で使用する方法
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcom to Airbnb" subtitle="Create an account!" />
      <Input
        id="name"
        label="Name"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      isOpen={registerModal.isOpen} // モーダルが開く関数はzustandのstateで管理
      onClose={registerModal.onClose} // モーダルを閉じる関数はzustandのstateで管理
      onSubmit={handleSubmit(onSubmit)} // [Tips] react-hook-formを使用した時のsubmitの処理を呼び出す方法 -> react-hook-formの SubmitHandler関数 の引数に定義したonSubmit関数を渡す
      disabled={isLoading}
    />
  )
}

export default RegisterModal
