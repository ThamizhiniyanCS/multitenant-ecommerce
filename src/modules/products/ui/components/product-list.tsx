'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { useTRPC } from '@/trpc/client'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  category?: string
}

const ProductList = ({ category }: Props) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.products.getMany.queryOptions({ category }))

  return <div>{JSON.stringify(data, null, 2)}</div>
}

export default ProductList

export const ProductListSkeleton = () => {
  return <div>Loading...</div>
}
