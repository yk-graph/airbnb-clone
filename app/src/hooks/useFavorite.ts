import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { SafeUser } from '@/types'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
  id: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ id, currentUser }: IUseFavorite) => {
  const router = useRouter()

  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorites || []

    return list.includes(id)
  }, [currentUser, id])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${id}`)
        } else {
          request = () => axios.post(`/api/favorites/${id}`)
        }

        await request()
        router.refresh()
        toast.success('Success')
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, id, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
