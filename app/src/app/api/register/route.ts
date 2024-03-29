import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export async function POST(req: Request) {
  // [Tips] リクエストボディからemailとpasswordを取得する方法
  const body = await req.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return new NextResponse('required error', { status: 400 })
  }

  // [Tips] ユーザーが既に存在するかどうかを確認する方法
  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return new NextResponse('user exists', { status: 409 })
  }

  // [Tips] パスワードをハッシュ化する方法
  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  })

  // [Tips] NextJSのAPIルートからレスポンスを返す方法
  return NextResponse.json(user)
}
