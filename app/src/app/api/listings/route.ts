import { NextResponse } from 'next/server'

import prisma from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  try {
    // 現在のユーザーを取得して、ユーザーが存在しない場合は未ログインとしてエラーを返す
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const body = await req.json()
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body

    Object.keys(body).forEach((value: any) => {
      if (!body[value]) {
        return new NextResponse('Not all entered', { status: 400 })
      }
    })

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10), // [Tips] 文字列を数値に変換する方法（10進数で指定）
        userId: currentUser.id,
      },
    })

    return NextResponse.json(listing)
  } catch (error) {
    console.log('[LISTING_POST]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
