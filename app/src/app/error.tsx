'use client'

import { useEffect } from 'react'

import EmptyState from '@/components/EmptyState'

interface ErrorStateProps {
  error: Error
}

// [Tips] エラーが発生した時のページの制御方法
const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />
}

export default ErrorState
