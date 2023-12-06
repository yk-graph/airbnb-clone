'use client'

import { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import qs from 'query-string'
import { Range } from 'react-date-range'

import Heading from '@/components/Heading'
import Calendar from '@/components/inputs/Calendar'
import Counter from '@/components/inputs/Counter'
import CountrySelect, {
  CountrySelectValue,
} from '@/components/inputs/CountrySelect'
import useSearchModal from '@/hooks/useSearchModal'
import { formatISO } from 'date-fns'
import Modal from './Modal'

// [Tips] ステップ式入力フォームの現在のステップを管理するためにenumを使う方法（これによりステップが 先に進む 前に戻る の制御を数値で行うことができる）
enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [step, setStep] = useState(STEPS.LOCATION) // [Tips] ステップ式で入力の状態を管理するためのテクニック | stepの値はenumで定義した数値になるため、stepの値を変更するときは数値で変更する
  const [location, setLocation] = useState<CountrySelectValue>()
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    // [Tips] react-date-rangeを使用した日付の範囲を選択する方法 | https://www.npmjs.com/package/react-date-range
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

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

  const onBack = useCallback(() => setStep((prevStep) => prevStep - 1), [])
  const onNext = useCallback(() => setStep((prevStep) => prevStep + 1), [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    // [Tips] useSearchParams | URL -> /?category=Beach | params.toString() -> 'category=Beach'
    if (params) {
      // [Tips] qs ライブラリ | parse -> URLなどの文字列をオブジェクトに変換するメソッド | stringify -> オブジェクトをURL形式の文字列に変換するメソッド
      // qs.parse(category=Beach) -> { category: 'Beach' }
      currentQuery = qs.parse(params.toString())
    }

    // [Tips] currentQuery という空の変数を用意して、クエリパラメータを追加していくテクニック
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate) // [Tips] formatISO -> ISO 8601形式の文字列に変換する関数（https://cpoint-lab.co.jp/article/202211/23581/）
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    /*
      [Tips] qs.stringifyUrlを使って、オブジェクトをURL形式の文字列に変換する方法
        queryString.stringifyUrl({url: 'https://foo.bar', query: {foo: 'bar'}});
        => 'https://foo.bar?foo=bar'
      [Tips] skipNull -> nullの値を無視するオプション（https://zenn.dev/fujiyama/articles/bf26790ed81964）
    */
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    )

    setStep(STEPS.LOCATION)
    searchModal.onClose()
    router.push(url)
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    onNext,
    bathroomCount,
    params,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search'
    }

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value)
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bahtrooms do you need?"
        />
      </div>
    )
  }

  return (
    <Modal
      title="Filter"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
    />
  )
}

export default SearchModal
