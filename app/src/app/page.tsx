/*
  [Tips] ★ サーバーコンポーネント側でsearchParamsを使うと、下記のエラーになるケースの対処法
  Dynamic server usage: Page couldn't be rendered statically because it used `searchParams.userId`
  　↓
  動的にsearchParamsを取得しようとしたが失敗したケースで出るエラー
  　↓
  [Tips] force-dynamic を指定して動的にsearchParamsの値を取得する方法
  https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
*/
export const dynamic = 'force-dynamic'

import getCurrentUser from '@/actions/getCurrentUser'
import getListings, { ListingsParams } from '@/actions/getListings'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'

// [Tips] サーバーコンポーネントでクエリパラメータを取得する方法 | searchParams を使う
export default async function Home({
  searchParams,
}: {
  searchParams: ListingsParams
}) {
  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)

  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}
