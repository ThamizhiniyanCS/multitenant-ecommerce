import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)',
  ],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl
  // NOTE: Extract the hostname (e.g., "slug.noroad.com" or "slug.localhost:3000")
  const hostname = req.headers.get('host') || ''

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || ''

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, '')

    return NextResponse.rewrite(new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url))
  }

  return NextResponse.next()
}
