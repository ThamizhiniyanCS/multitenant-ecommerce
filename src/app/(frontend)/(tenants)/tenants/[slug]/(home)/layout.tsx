import { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

import NavBar, { NavbarSkeleton } from '@/modules/tenants/ui/components/nav-bar'
import Footer from '@/modules/tenants/ui/components/footer'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }))

  return (
    <div className="min-h-screen bg-p[#F4F4F0] flex flex-col">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<NavbarSkeleton />}>
          <NavBar slug={slug} />
        </Suspense>
      </HydrationBoundary>

      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
