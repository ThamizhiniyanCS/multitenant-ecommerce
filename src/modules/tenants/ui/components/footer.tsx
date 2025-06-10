import Link from 'next/link'
import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
})

const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex items-center h-full px-2 gap-2 lg:px-12 py-6">
        <p>Powered by</p>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}>
          <span className={cn('text-2xl font-semibold', poppins.className)}>noroad</span>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
