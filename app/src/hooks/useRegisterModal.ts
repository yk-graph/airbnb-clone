/*
  新規登録のモーダルの開閉状態をグローバルに管理するためのカスタムフック
  これによりどのコンポーネントからでもモーダルの開閉を制御することができる
*/

import { create } from 'zustand'

interface RegisterModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal
