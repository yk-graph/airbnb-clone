'use client'

import { useSearchParams } from 'next/navigation'

import useSearchModal from '@/hooks/useSearchModal'
import { BiSearch } from 'react-icons/bi'
import useCountries from '@/hooks/useCountries'
import { useMemo } from 'react'
import { differenceInDays } from 'date-fns'

const Search = () => {
  const params = useSearchParams()
  const searchModal = useSearchModal()
  const { getByValue } = useCountries()

  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label
    }

    return 'Anywhere'
  }, [locationValue, getByValue])

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string)
      const end = new Date(endDate as string)

      // [Tips] date-fns の differenceInDays を使って日付の差分を取得する方法
      let diff = differenceInDays(end, start)
      if (diff === 0) diff = 1

      return `${diff} days`
    }

    return 'Any week'
  }, [startDate, endDate])

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`
    }

    return 'Add Guests'
  }, [guestCount])

  return (
    <div
      className="w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex items-center gap-3">
          <div className="hidden sm:block">{guestLabel}</div>
          {/* [Tips] アイコンを円で囲むtailwindのテクニック */}
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
