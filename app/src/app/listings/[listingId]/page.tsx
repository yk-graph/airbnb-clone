import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import getReservations from '@/actions/getReservations'
import EmptyState from '@/components/EmptyState'
import ListingClient from './ListingClient'

export default async function ListingDetailPage({
  params,
}: {
  params: { listingId: string }
}) {
  const listing = await getListingById(params.listingId)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return (
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}
