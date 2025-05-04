import { headers as getHeaders, cookies as getCookies } from 'next/headers'
import { TRPCError } from '@trpc/server'

import { baseProcedure, createTRPCRouter } from '@/trpc/init'

import { AUTH_COOKIE } from '../constants'
import { registerSchema, loginSchema } from '../schemas'

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders()

    const session = await ctx.payload.auth({ headers })

    return session
  }),
  register: baseProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const existingData = await ctx.payload.find({
      collection: 'users',
      limit: 1,
      where: {
        username: {
          equals: input.username,
        },
      },
    })

    const existingUser = existingData.docs[0]

    if (existingUser) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Username already taken',
      })
    }

    await ctx.payload.create({
      collection: 'users',
      data: {
        email: input.email,
        username: input.username,
        password: input.password, // NOTE: This will automatically hashed by Payload
      },
    })

    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Failed to login' })
    }

    const cookies = await getCookies()

    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: ""
    })
  }),
  login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
    const data = await ctx.payload.login({
      collection: 'users',
      data: {
        email: input.email,
        password: input.password,
      },
    })

    if (!data.token) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Failed to login' })
    }

    const cookies = await getCookies()

    cookies.set({
      name: AUTH_COOKIE,
      value: data.token,
      httpOnly: true,
      path: '/',
      // TODO: Ensure cross-domain cookie sharing
      // sameSite: "none",
      // domain: ""
    })

    return data
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies()
    cookies.delete(AUTH_COOKIE)
  }),
})
