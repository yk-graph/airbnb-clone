'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
  icon: IconType // [Tips] react-iconsのIconTypeってIconの型を指定する方法
  label: string
  selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter()
  const params = useSearchParams()

  // アイテムがクリックされたらURLのクエリパラメータを更新（同じアイテムがクリックされた場合はクエリパラメータをURLから削除する）してページを遷移する処理
  const handleClick = useCallback(() => {
    let currentQuery = {}

    // [Tips] useSearchParams | URL -> /?category=Beach | params.toString() -> 'category=Beach'
    if (params) {
      // [Tips] qs ライブラリ | parse -> URLなどの文字列をオブジェクトに変換するメソッド | stringify -> オブジェクトをURL形式の文字列に変換するメソッド
      // qs.parse(category=Beach) -> { category: 'Beach' }
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    }

    // [Tips] JavaScriptの delete演算子 でオブジェクトからプロパティを削除することができる
    // クリックされたアイテムが既に選択されている場合はクエリパラメータを削除する処理
    if (params.get('category') === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true } // [Tips] skipNull -> nullの値を無視するオプション（https://zenn.dev/fujiyama/articles/bf26790ed81964）
    )

    router.push(url)
  }, [label, router, params])

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
