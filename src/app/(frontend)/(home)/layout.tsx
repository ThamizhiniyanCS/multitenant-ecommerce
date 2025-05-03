import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient, trpc } from '@/trpc/server'

import NavBar from './nav-bar'
import Footer from './footer'
import SearchFilters, { SearchFiltersSkeleton } from './search-filters'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  )
}
