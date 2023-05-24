import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from '@/components/navbar/Navbar'
import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'

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
          <Modal actionLabel="Submit" title="hello" isOpen />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
