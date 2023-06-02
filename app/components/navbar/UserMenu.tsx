'use client'

import { FC, useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import Avatar from '@/components/Avatar'
import MenuItem from '@/components/navbar/MenuItem'

import { AiOutlineMenu } from 'react-icons/ai'

interface Props {
  currentUser?: User | null
}

const UserMenu: FC<Props> = ({ currentUser }) => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleIsOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
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
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My trips" />
                <MenuItem onClick={() => {}} label="My favarites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My proparties" />
                <MenuItem onClick={() => {}} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
