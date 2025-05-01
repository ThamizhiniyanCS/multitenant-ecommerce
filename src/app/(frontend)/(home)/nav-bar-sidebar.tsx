import React from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'

interface NavBarItem {
  href: string
  children: React.ReactNode
}

interface Props {
  items: NavBarItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NavBarSidebar = ({ items, open, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild className="lg:hidden mr-6 my-auto">
        <Button size="icon">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-full pb-2">
          <div className="flex flex-col w-full ">
            {items.map(({ href, children }) => (
              <Link
                key={href}
                href={href}
                className="w-full text-left p-4 flex items-center text-base font-medium"
                onClick={() => onOpenChange(false)}
              >
                {children}
              </Link>
            ))}
          </div>

          <div className="flex flex-col w-full border-t">
            <Link
              href="/sign-in"
              className="w-full text-left p-4 flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              Log In
            </Link>
            <Link
              href="/sign-up"
              className="w-full text-left p-4 flex items-center text-base font-medium"
              onClick={() => onOpenChange(false)}
            >
              Start Selling
            </Link>
          </div>
        </ScrollArea>

        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default NavBarSidebar
