'use client'

import { FC, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'

import Button from '@/components/Button'
import HeartButton from '@/components/HeartButton'
import useCountries from '@/hooks/useCountries'
import { SafeListing, SafeReservation, SafeUser } from '@/types'

// [Tips] イベントが発生した時（onClickが発火した時）に、onAction, actionLabel, actionId を親コンポーネントから受け取るようにすることで動的に処理内容を変更するためのテクニック
interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  disabled?: boolean
  currentUser?: SafeUser | null
  onAction?: (id: string) => void
  actionLabel?: string
  actionId?: string
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  disabled,
  currentUser,
  onAction,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation() // [Tips] イベントの伝播を止める方法 -> クリック要素が含まれる親要素のクリックイベントを発火させないためのテクニック

      if (disabled) {
        return
      }

      onAction?.(actionId) // [Tips] ?をつけることで、onActionが存在する場合のみ実行するためのテクニック
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  // [Tips] クリックできる要素の中に更にクリックできる要素があるケースでは、クリックイベントの伝播を止める必要がある
  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          {/* [Tips] NextのImageタグとTailwindを組み合わせてホバー時に画像の縮小サイズが大きくなるアニメーションの実装方法 */}
          <Image
            fill
            sizes="auto"
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard
