/*
  自身が登録した宿泊施設の一覧を表示するページ
  ListningテーブルのuserIdカラムと、currentUser.idを比較して、一致するものを表示する
*/

import EmptyState from '@/components/EmptyState'
import getCurrentUser from '@/actions/getCurrentUser'
import getListings from '@/actions/getListings'

import PropertiesClient from './PropertiesClient'

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const listings = await getListings({ userId: currentUser.id })
  // const listings = await getListings()

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    )
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}
