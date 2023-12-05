import { FC, Suspense } from 'react'

import Container from '@/components/Container'
import { SafeUser } from '@/types'
import Categories from './Categories'
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
      {/* [Tips] useSearchParamsを使うとページ全体がクライアントに読み込まれてしまうエラーを回避する方法
      　　        エラー文 -> Entire page deopted into client-side rendering
      　　        Categoriesコンポーネント内でuseSearchParamsを使っているためエラー発生 -> Suspenseを使ってエラーを回避する */}
      <Suspense>
        <Categories />
      </Suspense>
    </div>
  )
}

export default Navbar
