// 該当のListingIdから全ての予約情報を取得する、もしくは該当のUserIdから全ての予約情報を取得するための処理

import prismadb from '@/libs/prismadb'

// [Tips] 渡ってきたパラメータによってReservationから取得するデータを動的に分岐させるテクニック
export default async function getReservations(params: {
  listingId?: string // -> listingId（宿泊施設のID）に紐づく予約情報を取得する
  userId?: string // -> userId（宿泊者のユーザーのID）に紐づく予約情報を取得する
  authorId?: string // -> Reservation から見ると親に当たる Listing の中から、宿泊施設の提供者のユーザーIDに紐づく予約情報を取得する
}) {
  try {
    const { listingId, userId, authorId } = params

    const query: {
      listingId?: string
      userId?: string
      listing?: { userId: string }
    } = {}

    if (listingId) {
      query.listingId = listingId
    } // queryの中身は { listingId: listingId } となる

    if (userId) {
      query.userId = userId
    } // queryの中身は { userId: userId } となる

    // [Tips] belongs_to でリレーションが組まれてるテーブルのデータを取得する場合のクエリの指定方法
    if (authorId) {
      query.listing = { userId: authorId }
    } // queryの中身は { listing: { userId: authorId } } となる

    const reservations = await prismadb.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toLocaleString(),
      startDate: reservation.startDate.toLocaleString(),
      endDate: reservation.endDate.toLocaleString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toLocaleString(),
      },
    }))

    return safeReservations
  } catch (error: any) {
    throw new Error(error)
  }
}
