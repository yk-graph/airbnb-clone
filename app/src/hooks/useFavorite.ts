// [Tips] .tsファイルでもJSXをreturnしなければreactのhooksを使うことができる

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import { SafeUser } from '@/types'
import useLoginModal from './useLoginModal'

interface IUseFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()

  const loginModal = useLoginModal()

  // お気に入り登録済みかどうか、渡ってきたlistingIdから判定する処理
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favorites || []

    return list.some((item) => item.id === listingId)
  }, [currentUser, listingId])

  // お気に入り登録・解除の処理
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        // [Tips] ★ 条件によってAPIへのリクエストを変えて、返り値を管理するテクニック
        let request

        // お気に入り登録済みかどうかを判定して、登録済みの場合はお気に入り解除のリクエストを送る
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        // [Tips] ★ リクエスト自体を変数に格納して、awaitで待ってから実行するテクニック
        await request()

        router.refresh()
        toast.success('Success')
      } catch (error) {
        toast.error('Something went wrong.')
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
