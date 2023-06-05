'use client'

import { FC } from 'react'
import { User } from '@prisma/client' // prismaの機能で、schema.prismaで定義したスキーマファイルの内容から型定義を自動で行ってくれる

// components
import Container from '@/components/Container'
import Logo from '@/components/navbar/Logo'
import Search from '@/components/navbar/Search'
import UserMenu from '@/components/navbar/UserMenu'

interface Props {
  currentUser?: User | null
}

const Navbar: FC<Props> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
