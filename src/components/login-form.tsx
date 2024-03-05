'use client'

import * as React from 'react'
import { LoginInput, LoginSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FormError } from '@/components/form-error'
import Link from 'next/link'
import { pagesRoutes } from '@/schemas/app-routes'
import SocialAuth from '@/components/social-auth'
import { useSearchParams } from 'next/navigation'
import { logUserIn } from '@/actions/auth'

export function LoginForm() {
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'You already have an account with this email.'
      : ''
  const [error, setError] = React.useState<string | undefined>()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  async function onSubmit(values: LoginInput) {
    setError(undefined)

    startTransition(() => {
      logUserIn(values).catch((error: Error) => {
        setError(error.message)
      })
    })
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center items-center">
      <Card className={'sm:w-[480px]'}>
        <CardHeader>
          <div className="flex flex-col space-y-2 text-2xl">
            <h1>Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to login
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className={'space-y-6'}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SocialAuth />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={'email'}>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          id={'email'}
                          type={'email'}
                          placeholder={'Email'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={'email'}
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={'password'}>Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          id={'password'}
                          type={'password'}
                          placeholder={'Password'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={'password'}
                />
              </div>

              <FormError message={error ?? urlError} />

              <div className="form-actions flex flex-col items-center space-y-4">
                <Button
                  disabled={isPending}
                  type={'submit'}
                  className={cn('w-full')}
                >
                  Login
                </Button>
                <Link href={pagesRoutes.register}>
                  {"Don't have an account ?"}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}