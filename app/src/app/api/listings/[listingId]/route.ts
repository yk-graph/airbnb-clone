import { NextResponse } from 'next/server'

import getCurrentUser from '@/actions/getCurrentUser'
import prisma from '@/libs/prismadb'

export async function DELETE(
  request: Request,
  { params }: { params: { listingId?: string } }
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { listingId } = params

  if (!listingId || typeof listingId !== 'string') {
    return new NextResponse('Bad Request', { status: 400 })
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
