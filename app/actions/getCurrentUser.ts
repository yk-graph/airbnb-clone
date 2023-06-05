/*
  ログインしているかどうかを判定してログインしている場合は現在のユーザー情報を取得して返却する
  サーバー側で動作する処理をとして実装する
*/

import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import prisma from '@/libs/prismadb'

// next-authのgetServerSessionメソッドを使って現在のsession情報を取得する処理
export async function getSession() {
  return await getServerSession(authOptions)
}

// ログインしているかどうかを判定して返却する処理
export default async function getCurrentUser() {
  try {
    // session情報を取得する処理
    const session = await getSession()

    // session情報にユーザーのemail情報が含まれていなかったら未ログインとして判定
    if (!session?.user?.email) {
      return null
    }

    // DBの中になるユーザーのユニークなデータであるemail情報からsessionで返却されたユーザーのemailの値と一致するものを探して返却
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error: any) {
    return null
  }
}
