/*
  [Tips] トーストUIを表示する方法
  - react-hot-toast をインストールする
  - ToasterProvider を作成する
  - ToasterProvider をlayout.tsxで使用する
*/

'use client'

import { Toaster } from 'react-hot-toast'

const ToasterProvider = () => {
  return <Toaster />
}

export default ToasterProvider
