import NavBar from '@/modules/checkout/ui/components/nav-bar'
import Footer from '@/modules/tenants/ui/components/footer'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: LayoutProps) => {
  const { slug } = await params

  return (
    <div className="min-h-screen bg-p[#F4F4F0] flex flex-col">
      <NavBar slug={slug} />

      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>

      <Footer />
    </div>
  )
}

export default Layout
