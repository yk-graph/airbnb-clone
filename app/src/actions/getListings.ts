import prisma from '@/libs/prismadb'

export interface ListingsParams {
  userId?: string
  guestCount?: number
  roomCount?: number
  bathroomCount?: number
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

// listingsのデータを取得する処理
export default async function getListings(params: ListingsParams) {
  // export default async function getListings() {
  try {
    const { userId } = params

    // [Tips] 渡ってきたパラメータによってListingから取得するデータを動的に分岐させるテクニック | userIdに?がついているのは、userIdがある場合とない場合の双方を想定しているため
    const query: { userId?: string } = {}

    if (userId) {
      query.userId = userId
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toLocaleString(),
    }))

    return safeListings
  } catch (error: any) {
    throw new Error(error)
  }
}
