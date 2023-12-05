import prismadb from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return null
    }

    const favorites = await prismadb.favorite.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        listing: true,
      },
    })

    const listings = favorites.map((favorite) => ({
      ...favorite.listing,
      createdAt: favorite.listing.createdAt.toLocaleString(),
    }))

    return listings
  } catch (error: any) {
    throw new Error(error)
  }
}
