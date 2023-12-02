'use client'

import { FC, useMemo } from 'react'
import { Reservation } from '@prisma/client'

import { SafeListing, SafeUser } from '@/types'
import Container from '@/components/Container'
import { categories } from '@/components/navbar/Categories'
import ListingHead from '@/components/listings/ListingHead'
import ListingInfo from '@/components/listings/ListingInfo'

// [Tips] 既存のTSの型定義から型を追加して新たに型を定義するテクニック | & (インターセクション型 (intersection type)) を使う
interface ListingClientProps {
  reservations?: Reservation[]
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

const ListingClient: FC<ListingClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
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
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
