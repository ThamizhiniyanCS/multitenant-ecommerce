import Link from 'next/link'

import { useCart } from '@/modules/checkout/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  isPurchased?: boolean
  tenantSlug: string
  productId: string
}

const CartButton = ({ isPurchased, tenantSlug, productId }: Props) => {
  const cart = useCart(tenantSlug)

  if (isPurchased) {
    return (
      <Button className="flex-1 font-medium bg-white" asChild>
        <Link prefetch href={`/library/${productId}`}>
          View in Library
        </Link>
      </Button>
    )
  }

  return (
    <Button
      className={cn(
        'flex-1 bg-pink-400 cursor-pointer',
        cart.isProductInCart(productId) && 'bg-white',
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? 'Remove from cart' : 'Add to cart'}
    </Button>
  )
}

export default CartButton
