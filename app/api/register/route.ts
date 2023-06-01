import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'

import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  console.log('req', req)

  const body = await req.json()
  console.log('body', body)

  const { email, name, password } = body

  const hashedPassword = await bcrypt.hash(password, 12)
  console.log('hashedPassword', hashedPassword)

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  })

  console.log('user', user)

  return NextResponse.json(user)
}
