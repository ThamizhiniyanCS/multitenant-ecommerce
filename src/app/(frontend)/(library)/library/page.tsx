import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import { DEFAULT_LIMIT } from '@/constants'
import LibraryView from '@/modules/library/ui/views/library-view'
import { getQueryClient, trpc } from '@/trpc/server'

const Page = async () => {
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery(
    trpc.library.getMany.infiniteQueryOptions({
      limit: DEFAULT_LIMIT,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LibraryView />
    </HydrationBoundary>
  )
}

export default Page
