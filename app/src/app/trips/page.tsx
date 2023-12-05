/*
  自分自身が予約した宿泊の一覧を表示するページ
  ReservationテーブルのuserIdとログインユーザーのIDが一致するレコードを全て取得して表示する
  ※自身が提供した宿泊施設（Listings）に登録された予約一覧は /reservations で表示する
*/

import getCurrentUser from '@/actions/getCurrentUser'
import getReservations from '@/actions/getReservations'
import EmptyState from '@/components/EmptyState'
import TripsClient from './TripsClient'

export default async function TripsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  // ログイン中のユーザーのIDをparamsに渡して、そのユーザーの予約情報の一覧を取得する
  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    )
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}
