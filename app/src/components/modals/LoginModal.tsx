/* 
  [Tips] react-hook-formを使用してフォームの入力値を管理する方法
  新規登録ページの入力値の管理・APIへのPOSTリクエストはこのコンポーネントで管理
*/

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'

import useLoginModal from '@/hooks/useLoginModal'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import Modal from './Modal'

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false) // loading状態がtrueの時はボタンをdisabledにする

  // [Tips] react-hook-form の useForm を使用デフォルトの値を設定する方法
  const {
    register, // [Tips] react-hook-form の register を使用してinput要素を登録する方法（https://react-hook-form.com/docs/useform/register）
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // [Tips] react-hook-form の SubmitHandler を使用してフォームの入力値を取得（data として受け取る）してPOSTリクエストを送信する方法
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)

    // [Tips] next-authでsignInを使う場合、第一引数に使用するproviders名,第二引数に渡すデータの情報を指定
    await signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callbask) => {
      // [Tips] next-authのsignInメソッドの返り値を使ったエラーハンドリング -> callbackにnext-authのSignInResponseの返却値でokかerrorが渡ってくる
      if (callbask?.ok) {
        setIsLoading(false)
        toast.success('Logged in')
        router.refresh() // [Tips] サーバーからデータをfetchし直すテクニック
        loginModal.onClose()
      }

      if (callbask?.error) {
        toast.error(callbask.error)
      }
    })
  }

  // [Tips] return外で定義した変数をJSX内で使用する方法
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcom Back" subtitle="Login to your account!" />
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
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          Already have an account?
          <span
            onClick={loginModal.onClose}
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
      disabled={isLoading}
      title="Login"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      isOpen={loginModal.isOpen} // モーダルが開く関数はzustandのstateで管理
      onClose={loginModal.onClose} // モーダルを閉じる関数はzustandのstateで管理
      onSubmit={handleSubmit(onSubmit)} // [Tips] react-hook-formを使用した時のsubmitの処理を呼び出す方法 -> react-hook-formの SubmitHandler関数 の引数に定義したonSubmit関数を渡す
    />
  )
}

export default LoginModal
