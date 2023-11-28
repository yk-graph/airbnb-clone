'use client'

import { FC, useCallback, useState } from 'react'
// import { SafeUser } from '@/types'
// import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// components
import Avatar from '@/components/Avatar'
import MenuItem from './MenuItem'
// import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

// icons
import { AiOutlineMenu } from 'react-icons/ai'

// interface Props {
//   currentUser?: SafeUser | null
// }

// const UserMenu: FC<Props> = ({ currentUser }) => {
const UserMenu: FC = () => {
  const router = useRouter()
  // const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleIsOpen}
          className="p-4 md:py-1 md:px-2 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {/* {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem label="Airbnb your home" onClick={() => {}} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <> */}
            {/* <MenuItem label="Login" onClick={loginModal.onOpen} /> */}
            <MenuItem label="Login" onClick={() => {}} />
            <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            {/* </>
            )} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
