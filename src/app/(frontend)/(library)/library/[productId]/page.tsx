import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { Suspense } from 'react'

import ProductView, { ProductViewSkeleton } from '@/modules/library/ui/views/product-view'
import { getQueryClient, trpc } from '@/trpc/server'

interface Props {
  params: Promise<{
    productId: string
  }>
}

const Page = async ({ params }: Props) => {
  const { productId } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.library.getOne.queryOptions({ productId }))
  void queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({ productId }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  )
}

export default Page
