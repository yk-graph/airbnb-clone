import { FC } from 'react'

import { SafeUser } from '@/types'
import Container from '@/components/Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'

interface NavbarProps {
  currentUser?: SafeUser | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
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
