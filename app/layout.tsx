/*
  layoutはデフォルトではサーバーサイドコンポーネント
*/

import { Nunito } from 'next/font/google'
import './globals.css'

// mountが完了されるまでは表示させない制御をかけている
import ClientOnly from '@/components/ClientOnly'

// サーバーサイド側の処理でセッション情報から現在ログインしているユーザーがいるかどうかの判定を別ファイルで管理している
import getCurrentUser from '@/actions/getCurrentUser'

// components
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import Navbar from '@/components/navbar/Navbar'

// lib provider *トーストのライブラリ(Providerで囲う必要があるためprovidersフォルダで管理)
import ToasterProvider from '@/providers/ToasterProvider'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone site',
}

// getCurrentUser()が非同期処理の関数であるためLayoutコンポーネント全体を async function にする必要がある
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser() // layoutコンポーネントでcurrentUserの情報を取得してコンポーネントに降ろしていく

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
