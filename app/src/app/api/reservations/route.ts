import { NextResponse } from 'next/server'

import prismadb from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json('Invalid user', { status: 401 })
  }

  const body = await req.json()
  const { listingId, startDate, endDate, totalPrice } = body

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return new NextResponse('required error', { status: 400 })
  }

  // [Tips] 1 対 N のリレーションが組まれているテーブルのレコードを作成する方法 | data -> テーブル名 -> create { ... }　という形で記述する
  const listingAndReservation = await prismadb.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  })

  return NextResponse.json(listingAndReservation)
}
