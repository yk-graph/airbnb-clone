import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

import getCurrentUser from '@/actions/getCurrentUser'

export async function POST(
  req: Request,
  { params }: { params: { listingId: string } } // [Tips] パラメータを受け取る方法
) {
  try {
    const currentUser = await getCurrentUser()

    // ログインしていない場合は401エラーを返却する
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { listingId } = params

    // パラメータにlistingIdが含まれていない場合は400エラーを返却する
    if (!listingId || typeof listingId !== 'string') {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const favorite = await prisma.favorite.create({
      data: {
        id: listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(favorite)
  } catch (error) {
    console.log('[FAVORITE_POST]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { listingId: string } }
) {
  try {
    const currentUser = await getCurrentUser()

    // ログインしていない場合は401エラーを返却する
    if (!currentUser) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { listingId } = params

    // パラメータにlistingIdが含まれていない場合は400エラーを返却する
    if (!listingId || typeof listingId !== 'string') {
      return new NextResponse('Bad Request', { status: 400 })
    }

    const favorite = await prisma.favorite.delete({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    })

    return NextResponse.json(favorite)
  } catch (error) {
    console.log('[FAVORITE_DELETE]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
