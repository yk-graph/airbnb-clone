import './globals.css'
import { Nunito } from 'next/font/google'

import ToasterProvider from '@/providers/ToasterProvider'
import Navbar from '@/components/navbar/Navbar'
import ClientOnly from '@/components/ClientOnly'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
