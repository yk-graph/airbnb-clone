// 該当のListingIdから全ての予約情報を取得する、もしくは該当のUserIdから全ての予約情報を取得するための処理

import prismadb from '@/libs/prismadb'

export default async function getReservations(params: { listingId: string }) {
  try {
    const { listingId } = params

    const reservations = await prismadb.reservation.findMany({
      where: {
        listingId,
      },
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
