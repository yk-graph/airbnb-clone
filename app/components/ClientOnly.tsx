/*
  Hydration Errorを防ぐためにコンポーネント全体をラップする
*/
'use client'

import React, { FC, ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

const ClientOnly: FC<Props> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [hasMounted])

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientOnly
