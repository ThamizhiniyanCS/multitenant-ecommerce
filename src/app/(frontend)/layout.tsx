import React from 'react'
import { DM_Sans } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { cn } from '@/lib/utils'
import { TRPCReactProvider } from '@/trpc/client'
import { Toaster } from '@/components/ui/sonner'

import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

const dm_sans = DM_Sans({ subsets: ['latin'] })

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn('antialiased scroll-smooth', dm_sans.className)}>
        <main>
          <NuqsAdapter>
            <TRPCReactProvider>
              {children}
              <Toaster />
            </TRPCReactProvider>
          </NuqsAdapter>
        </main>
      </body>
    </html>
  )
}
