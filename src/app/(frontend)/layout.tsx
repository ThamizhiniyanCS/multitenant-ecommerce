import React from 'react'
import './styles.css'
import { DM_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'

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
        <main>{children}</main>
      </body>
    </html>
  )
}
