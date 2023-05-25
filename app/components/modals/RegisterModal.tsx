'use client'

import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import useRegisterModal from '@/hooks/useRegisterModal'
import Modal from '@/components/modals//Modal'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import Button from '@/components/Button'

export const RegisterModal = () => {
  const { isOpen, onOpen, onClose } = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log({ ...data })
    setIsLoading(true)

    axios
      .post('/api/register', data)
      .then(() => onClose())
      .catch((error) => toast.error('Something Error'))
      .finally(() => setIsLoading(false))
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcom to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id="name"
        label="Name"
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
            onClick={onClose}
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
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}
