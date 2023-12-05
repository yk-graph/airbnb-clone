/*
  自身が提供した宿泊施設（Listings）への予約一覧を表示するページ
*/

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import EmptyState from '@/components/EmptyState'
import TripsClient from './ReservationsClient'

export default async function ReservationsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  // Listing 1 : Reservation N の関係値で、LinstingのuserIdが自身のuserIdと一致している条件でReservationから検索をかける
  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}
