import prisma from '@/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      // [Tips] include : リレーション先のデータを取得する方法 -> User1 対 Listing多数 の関係性のテーブルで、紐づくUserのデータを取得するための記述
      include: {
        user: true,
      },
    })

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toLocaleString(), // [Tips] Data型の値を日本時間の文字列に変換する方法
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toLocaleString(),
        updatedAt: listing.user.updatedAt.toLocaleString(),
        emailVerified: listing.user.emailVerified?.toLocaleString() || null,
      },
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
