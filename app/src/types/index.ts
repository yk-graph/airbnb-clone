/*
  [Tips] Omitを使って、ある型から一部のプロパティを省いて新しい型を作成する方法
  [Tips] & (インターセクション型 (intersection type))を使って、複数の型を結合して新しい型を作成する方法

  Omit使用例（https://typescriptbook.jp/reference/type-reuse/utility-types/omit）
  type User = {
    name: string
    age: number
    address?: string
    createdAt: string
    updatedAt: string
  }
  type Optional = "address" | "createdAt" | "updatedAt"
  type Person = Omit<User, Optional> ---> { name: string; age: number; } になる

  インターセクション型使用例
  type TwoDimensionalPoint = {
    x: number
    y: number
  }
  type Z = {
    z: number
  }
  type ThreeDimensionalPoint = TwoDimensionalPoint & Z ---> { x: number; y: number; z: number; } になる
*/

import { Favorite, Listing, Reservation, User } from '@prisma/client'

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
  favorites?: Favorite[]
}

export type SafeListing = Omit<Listing, 'createdAt'> & {
  createdAt: string
}

export type SafeReservation = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
  createdAt: string
  startDate: string
  endDate: string
  listing: SafeListing
}
