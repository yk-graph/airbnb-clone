/*
  [Tips] googleやgithubでの認証とemailとpasswordでの認証を行う方法
  - npm install @prisma/client @next-auth/prisma-adapter が必要
  - https://next-auth.js.org/v3/adapters/prisma
*/

import { type NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import bcrypt from 'bcrypt'

import prisma from '@/libs/prismadb'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        // ユーザーが存在しない場合と、hashedPasswordが存在しないケースはエラー
        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        // パスワードが一致しないしているかどうかを確認
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user
      },
    }),
  ],

  // サインインページのパスを指定
  pages: {
    signIn: '/', // 今回はモーダルで表示するため、サインインページは指定しない
  },

  // debugをtrueにすると、ログイン時にエラーが発生した場合に、エラーの詳細を表示する
  debug: process.env.NODE_ENV === 'development',

  // セッションの設定 - JWTを使用したセッションを有効にする
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days -> セッションの有効期限を設定
    updateAge: 24 * 60 * 60, // 24 hours -> セッションの有効期限を更新する間隔を設定
  },

  // JWTのsecretの設定
  secret: process.env.NEXTAUTH_SECRET,
}
