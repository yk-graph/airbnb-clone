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
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params

    // [Tips] 渡ってきたパラメータによってListingから取得するデータを動的に分岐させるテクニック | userIdに?がついているのは、userIdがある場合とない場合の双方を想定しているため
    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount, // [Tips] gteはgreater than or equal toの略で、roomCountがroomCount以上の場合にtrueとなる
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      }
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    // [Tips] startDateとendDateがある場合、予約済みのlistingは除外する | https://qiita.com/koffee0522/items/92be1826f1a150bfe62e
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
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
