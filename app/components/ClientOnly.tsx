/*
  Hydration Errorを防ぐために
  コンポーネント全体をラップする
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
  }, [])

  if (!hasMounted) return null

  return <>{children}</>
}

export default ClientOnly
