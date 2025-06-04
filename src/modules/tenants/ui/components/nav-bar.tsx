'use client'

import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShoppingCartIcon } from 'lucide-react'

import { useTRPC } from '@/trpc/client'
import { generateTenantURL } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const CheckoutButton = dynamic(
  () => import('@/modules/checkout/ui/components/checkout-button').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Button className="bg-white" disabled>
        <ShoppingCartIcon />
      </Button>
    ),
  },
)

interface Props {
  slug: string
}

const NavBar = ({ slug }: Props) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }))

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link href={generateTenantURL(slug)} className="flex items-center gap-2">
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-8"
              alt={slug}
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>

        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  )
}

export default NavBar

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div className="" />
        <Button className="bg-white" disabled>
          <ShoppingCartIcon />
        </Button>
      </div>
    </nav>
  )
}
