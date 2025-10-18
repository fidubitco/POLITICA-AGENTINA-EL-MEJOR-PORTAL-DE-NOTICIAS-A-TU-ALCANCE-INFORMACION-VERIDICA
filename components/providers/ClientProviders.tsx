'use client'

import dynamic from 'next/dynamic'

// Import Toaster dynamically to avoid SSR issues
const Toaster = dynamic(
  () => import('@/components/ui/toaster').then((mod) => mod.Toaster),
  { ssr: false }
)

export function ClientProviders() {
  return <Toaster />
}
