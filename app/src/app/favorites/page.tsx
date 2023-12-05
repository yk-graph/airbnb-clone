/*
  お気に入りに登録したリストを表示するページ
  FavoriteテーブルのuserIdがログインユーザーのIDと一致するレコードを取得して、そのレコードのlistingIdと一致するListingテーブルのレコードを取得して表示する
*/

import EmptyState from '@/components/EmptyState'
import getCurrentUser from '@/actions/getCurrentUser'
import getFavoriteListings from '@/actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'

export default async function FavoritesPage() {
  const listings = await getFavoriteListings()
  const currentUser = await getCurrentUser()

  if (!listings || listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    )
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}
