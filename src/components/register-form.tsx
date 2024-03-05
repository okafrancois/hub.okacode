'use client'

import * as React from 'react'
import { SignUpInput, SignUpSchema } from '@/schemas'
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
import { FormSuccess } from '@/components/form-success'
import Link from 'next/link'
import { pagesRoutes } from '@/schemas/app-routes'
import SocialAuth from '@/components/social-auth'
import { register } from '@/actions/auth'

export function RegisterForm() {
  const [success, setSuccess] = React.useState<string | undefined>()
  const [error, setError] = React.useState<string | undefined>()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  })
  async function onSubmit(values: SignUpInput) {
    startTransition(() => {
      register(values)
        .then((response) => {
          setSuccess(response.success)
        })
        .catch((error: Error) => {
          setError(error.message)
        })
    })
  }

  return (
    <div className="mx-auto flex w-full flex-col justify-center items-center">
      <Card className={'sm:w-[480px]'}>
        <CardHeader>
          <div className="flex flex-col space-y-2 text-2xl">
            <h1>Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to create your account
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
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={'repeatPassword'}>
                        Repeat password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          {...field}
                          id={'repeatPassword'}
                          type={'password'}
                          placeholder={'Repeat password'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name={'repeatPassword'}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="form-actions flex flex-col items-center space-y-4">
                <Button
                  disabled={isPending}
                  type={'submit'}
                  className={cn('w-full')}
                >
                  Create an account
                </Button>
                <Link href={pagesRoutes.login}>{'Have an account ?'}</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}