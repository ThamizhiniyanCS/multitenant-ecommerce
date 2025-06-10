import { cookies as getCookies } from 'next/headers'

interface Props {
  prefix: string
  value: string
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies()

  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: '/',
    // NOTE: This enables the cookie auth on localhost
    // But it will not work with subdomains turned on
    ...(process.env.NODE_ENV !== 'development' && {
      sameSite: 'none',
      domain: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
      secure: true,
    }),
  })
}
