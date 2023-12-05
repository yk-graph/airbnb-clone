import { NextResponse } from 'next/server'

import prismadb from '@/libs/prismadb'
import getCurrentUser from '@/actions/getCurrentUser'

export async function DELETE(
  req: Request,
  { params }: { params: { reservationId: string } }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.json('Invalid user', { status: 401 })
  }

  const { reservationId } = params

  if (!reservationId || typeof reservationId !== 'string') {
    return new NextResponse('Bad Request', { status: 400 })
  }

  // [Tips] ORを使ったクエリ | 1つ以上の条件に一致するかどうか（https://qiita.com/koffee0522/items/92be1826f1a150bfe62e）
  const reservation = await prismadb.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json(reservation)
}
