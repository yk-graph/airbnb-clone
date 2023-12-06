import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Nunito } from 'next/font/google'
import './globals.css'

import getCurrentUser from '@/actions/getCurrentUser'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
import SearchModal from '@/components/modals/SearchModal'
import Navbar from '@/components/navbar/Navbar'
import ToasterProvider from '@/providers/ToasterProvider'

// [Tips] フォントを指定方法
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  /* [Tips] useSearchParamsを使うとページ全体がクライアントに読み込まれてしまうエラーを回避する方法
　　エラー文 -> Entire page deopted into client-side rendering
　　SearchModalコンポーネント内, Navbarコンポーネントの Search,Categoriesコンポーネント内でuseSearchParamsを使っているためエラー発生 -> Suspenseを使ってエラーを回避する */
  return (
    <html lang="ja">
      <body className={font.className}>
        <Suspense>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </Suspense>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
