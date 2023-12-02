import getCurrentUser from '@/actions/getCurrentUser'
import getListingById from '@/actions/getListingById'
import EmptyState from '@/components/EmptyState'
import ListingClient from './ListingClient'

export default async function ListingDetailPage({
  params,
}: {
  params: { listingId: string }
}) {
  const listing = await getListingById(params.listingId)
  const currentUser = await getCurrentUser()

  if (!listing) {
    return <EmptyState />
  }

  return <ListingClient listing={listing} currentUser={currentUser} />
}
