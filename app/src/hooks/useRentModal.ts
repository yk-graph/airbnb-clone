/*
  宿泊施設を登録するためのモーダルの開閉状態をグローバルに管理するためのカスタムフック
  これによりどのコンポーネントからでもモーダルの開閉を制御することができる
*/

import { create } from 'zustand'

interface RentModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRentModal = create<RentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useRentModal
