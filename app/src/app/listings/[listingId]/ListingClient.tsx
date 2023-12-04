/*
  [Tips] react-leaflet を使って Map画面をdynamic関数を使ってLazyLoadして表示させる方法
  [Tips] react-date-range を使ってカレンダーから日付を選択する方法
*/

'use client'

import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { Range } from 'react-date-range'
import axios from 'axios'
import toast from 'react-hot-toast'

import Container from '@/components/Container'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'
import ListingReservation from '@/components/listings/ListingReservation'
import { categories } from '@/components/navbar/Categories'
import useLoginModal from '@/hooks/useLoginModal'
import { SafeListing, SafeReservation, SafeUser } from '@/types'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

// [Tips] 既存のTSの型定義から型を追加して新たに型を定義するテクニック | & (インターセクション型 (intersection type)) を使う
interface ListingClientProps {
  reservations?: SafeReservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: FC<ListingClientProps> = ({
  reservations = [],
  listing,
  currentUser,
}) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  console.log('reservations --->', reservations)

  // 宿泊の日数と宿泊料金を計算してtotalPriceに格納する
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      // [Tips] differenceInDays -> 2つの日付の間の丸 1日の期間の数を取得する方法（https://runebook.dev/ja/docs/date_fns/differenceInDays）
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      loginModal.onOpen()
    }

    setIsLoading(true)

    await axios
      .post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success('Listing Reserved!')
        setDateRange(initialDateRange)

        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong!')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [totalPrice, dateRange, listing?.id, currentUser, router, loginModal])

  // 選択できない日付を設定 -> Reservationsの中に配列で予約日時が格納されているため、loop処理で予約済みの日付の値を取り出して格納する
  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    // [Tips] eachDayOfInterval を使って、日付の範囲を指定して配列を生成する方法（https://tech.mof-mof.co.jp/blog/date-fns/）
    reservations.forEach((reservation) => {
      console.log(
        'new Date(reservation.startDate) --->',
        new Date(reservation.startDate)
      )

      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto>ListingClient"></div>
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            category={category}
            description={listing.description}
            roomCount={listing.roomCount}
            guestCount={listing.guestCount}
            bathroomCount={listing.bathroomCount}
            locationValue={listing.locationValue}
          />
          <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={isLoading}
              disabledDates={disabledDates}
            />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
