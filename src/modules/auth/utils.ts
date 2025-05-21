import { cookies as getCookies } from 'next/headers'

interface Props {
  prefix: String
  value: string
}

export const generateAuthCookie = async ({ prefix, value }: Props) => {
  const cookies = await getCookies()

  cookies.set({
    name: `${prefix}-token`,
    value,
    httpOnly: true,
    path: '/',
    // TODO: Ensure cross-domain cookie sharing
    // sameSite: "none",
    // domain: ""
  })
}
