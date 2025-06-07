import Link from 'next/link'

import { generateTenantURL } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Props {
  slug: string
}

const NavBar = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button asChild>
          <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
