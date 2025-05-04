'use client'

import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import NavBarSidebar from './nav-bar-sidebar'

interface NavBarItemProps {
  href: string
  children: React.ReactNode
  isActive?: boolean
}

const NavBarItem = ({ href, children, isActive }: NavBarItemProps) => {
  return (
    <Button
      asChild
      className={cn('rounded-full', isActive ? 'bg-main' : 'bg-white')}
      variant={isActive ? 'noShadow' : 'default'}
    >
      <Link href={href} className={cn(isActive ? 'cursor-default' : 'cursor-pointer')}>
        {children}
      </Link>
    </Button>
  )
}

const navBarItems = [
  { href: '/', children: 'Home' },
  { href: '/about', children: 'About' },
  { href: '/features', children: 'Features' },
  { href: '/pricing', children: 'Pricing' },
  { href: '/contact', children: 'Contact' },
]

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })

const NavBar = () => {
  const pathname = usePathname()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="ml-6 flex items-center cursor-pointer">
        <span className={cn('text-5xl font-semibold', poppins.className)}>noroad</span>
      </Link>

      <div className="items-center gap-4 hidden lg:flex">
        {navBarItems.map(({ href, children }) => (
          <NavBarItem key={href} href={href} isActive={pathname === href}>
            {children}
          </NavBarItem>
        ))}
      </div>

      <div className="hidden lg:flex">
        <Button
          asChild
          className={cn(
            'border-l border-r-0 border-y-0 rounded-none bg-white hover:bg-main transition-colors text-lg h-full px-12',
          )}
          variant="noShadow"
        >
          <Link prefetch href="/sign-in">
            Login
          </Link>
        </Button>
        <Button
          asChild
          className={cn(
            'border-l border-r-0 border-y-0 rounded-none bg-white hover:bg-main transition-colors text-lg h-full px-12',
          )}
          variant="noShadow"
        >
          <Link prefetch href="/sign-up">
            Start Selling
          </Link>
        </Button>
      </div>

      <NavBarSidebar items={navBarItems} open={isSideBarOpen} onOpenChange={setIsSideBarOpen} />
    </nav>
  )
}

export default NavBar
