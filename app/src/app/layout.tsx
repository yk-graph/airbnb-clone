import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import getCurrentUser from '@/actions/getCurrentUser'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import RentModal from '@/components/modals/RentModal'
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

  return (
    <html lang="ja">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
