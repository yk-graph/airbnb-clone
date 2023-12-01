import prisma from '@/libs/prismadb'

// listingsのデータを取得する処理
export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
