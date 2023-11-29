/*
  ログインしているかどうかを判定してログインしている場合は現在のユーザー情報を取得して返却する
  サーバー側で動作する処理をとして実装する
*/

import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/libs/next-auth-options'
import prisma from '@/libs/prismadb'

// ログインしているかどうかを判定して返却する処理
export default async function getCurrentUser() {
  try {
    // next-authのgetServerSessionメソッドを使って現在のsession情報を取得する処理
    const session = await getServerSession(authOptions)

    // session情報にユーザーのemail情報が含まれていなかったら未ログインとして判定
    if (!session?.user?.email) {
      return null
    }

    // DBの中になるユーザーのユニークなデータであるemail情報からsessionで返却されたユーザーのemailの値と一致するものを探して返却
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!currentUser) {
      return null
    }

    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: currentUser.emailVerified?.toISOString() || null,
    // }
    return currentUser
  } catch (error: any) {
    return null
  }
}
