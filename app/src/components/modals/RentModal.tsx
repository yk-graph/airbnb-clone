/*
  ログイン済みのユーザーが物件を登録するためのモーダル
  [Tips] 入力フォームをステップ式で表示・入力データを保持するためのテクニック
  [Tips] next/dynamic の機能を使ってSSRを回避したライブラリのimportを実現するテクニック
*/

'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
// import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'

import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import CountrySelect from '@/components/inputs/CountrySelect'
import { categories } from '@/components/navbar/Categories'
import useRentModal from '@/hooks/useRentModal'
import Modal from './Modal'

// [Tips] ステップ式入力フォームの現在のステップを管理するためにenumを使う方法（これによりステップが 先に進む 前に戻る の制御を数値で行うことができる）
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(STEPS.CATEGORY) // [Tips] ステップ式で入力の状態を管理するためのテクニック | stepの値はenumで定義した数値になるため、stepの値を変更するときは数値で変更する

  // [Tips] ★ watch を使って、指定された入力を監視し、その値を返すためのテクニック | 入力値をレンダリングしたり、条件によって何をレンダリングするかを決定したりするのに使用する
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      // STEPS.CATEGORY (0) で入力したい値
      category: '',
      // STEPS.LOCATION (1) で入力したい値
      location: null,
      // STEPS.INFO (2) で入力したい値
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      // STEPS.IMAGES (3) で入力したい値
      imageSrc: '',
      // STEPS.DESCRIPTION (4) で入力したい値
      title: '',
      description: '',
      // STEPS.PRICE (5) で入力したい値
      price: 1,
    },
  })

  // [Tips] watchで監視している値を変数に代入することで、その値をレンダリングしたり、条件によって何をレンダリングするかを決定したりすることができる方法 | https://react-hook-form.com/docs/useform/watch
  const category = watch('category')
  const location = watch('location')
  const guestCount = watch('guestCount')
  const roomCount = watch('roomCount')
  const bathroomCount = watch('bathroomCount')
  const imageSrc = watch('imageSrc')

  /*
    [Tips] ★ dynamicを使って、SSRを無効にする方法 | https://nextjs.org/docs/advanced-features/dynamic-import
    これを使うことで、Mapコンポーネントを使うときにSSRを無効にすることができるため、下記のエラーを回避することができる
    ⨯ node_modules/leaflet/dist/leaflet-src.js (230:0) @ eval
    ⨯ ReferenceError: window is not defined
  */
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    // [Tips] setValueを使って値を設定するためのテクニック | 第一引数 -> 入力値のkey | 第二引数 -> 登録したい値 | https://react-hook-form.com/docs/useform/setvalue
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => setStep((prevStep) => prevStep - 1)
  const onNext = () => setStep((prevStep) => prevStep + 1)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    // setIsLoading(true)

    // await axios
    //   .post('/api/listings', data)
    //   .then(() => {
    //     toast.success('Listing created!')
    //     router.refresh()
    //     reset()
    //     setStep(STEPS.CATEGORY)
    //     rentModal.onClose()
    //   })
    //   .catch(() => {
    //     toast.error('Something went wrong.')
    //   })
    //   .finally(() => {
    //     setIsLoading(false)
    //   })
  }

  // [Tips] ステップに応じてボタンのラベルを変更するためのテクニック
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step])

  /*
    [Tips] ステップに応じてモーダルの中身が変更されるため、constではなくletで定義する
    - 初期表示では物件のカテゴリー（navbarからimportしたcategories）を選択するためのコンポーネントを表示する
    - CategoryInputコンポーネントに渡るlabelにはcategoriesから取得したlabelを渡す
    - onClickが発火したら、clickされた対象のlabelの値が onClick={(category) に渡ってくるので、setCustomValue('category', category)} でcategoryの値を更新する
  */
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location} // 初期状態ではnullが入り、選択されたら CountrySelectValue の値が入る
          onChange={(value) => setCustomValue('location', value)} // セレクトボックスが変更されたら location というキーに CountrySelectValue の値が入る
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  return (
    <Modal
      title="Airbnb your home"
      body={bodyContent}
      // footer={footerContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  )
}

export default RentModal
