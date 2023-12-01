import { Listing } from '@prisma/client'

import getCurrentUser from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listing/ListingCard'
interface HomeProps {
  params: {}
}

export default async function Home() {
  const currentUser = await getCurrentUser()
  const listings = await getListings()

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: Listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}
