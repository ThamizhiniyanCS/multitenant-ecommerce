import Link from 'next/link'
import { ShoppingCartIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn, generateTenantURL } from '@/lib/utils'

import { useCart } from '../../hooks/use-cart'

interface Props {
  className?: string
  tenantSlug: string
  hideIfEmpty?: boolean
}

const CheckoutButton = ({ className, tenantSlug, hideIfEmpty }: Props) => {
  const { totalItems } = useCart(tenantSlug)

  if (hideIfEmpty && totalItems === 0) return null

  return (
    <Button className={cn('bg-white', className)} asChild>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ''}
      </Link>
    </Button>
  )
}

export default CheckoutButton
