'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'

import { loginSchema } from '../../schemas'

const poppins = Poppins({ subsets: ['latin'], weight: ['700'] })

const SignInView = () => {
  const router = useRouter()

  const trpc = useTRPC()
  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: () => {
        router.push('/')
      },
    }),
  )

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    login.mutate(values)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 p-4 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center cursor-pointer">
                <span className={cn('text-2xl font-semibold', poppins.className)}>noroad</span>
              </Link>

              <Button
                asChild
                variant="reverse"
                size="sm"
                className="text-base border-none underline bg-[#F4F4F0] hover:bg-main"
              >
                <Link prefetch href="/sign-up">
                  Sign up
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-medium">Welcome back to noroad.</h1>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={login.isPending} type="submit" size="lg" className="cursor-pointer">
              Log In
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </div>
  )
}

export default SignInView
