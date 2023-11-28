import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/navbar/Navbar'

// [Tips] フォントを指定方法
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
