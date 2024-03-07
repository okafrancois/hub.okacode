'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { PAGE_ROUTES } from '@/schemas/app-routes'
import { CollectionInput, CollectionSchema } from '@/schemas'
import { postCollection, updateCollection } from '@/actions/collections'
import { Icons } from '@/components/icons'
import { Collection, Visibility } from '@prisma/client'

type CollectionFormProps = {
  data?: Collection
}
export default function CollectionForm({
  data,
}: Readonly<CollectionFormProps>) {
  const router = useRouter()
  const form = useForm<CollectionInput>({
    resolver: zodResolver(CollectionSchema),
    defaultValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      is_private: data?.visibility === Visibility.PRIVATE || false,
    },
  })

  const [error, setError] = React.useState<string | undefined>()
  const [isPending, startTransition] = React.useTransition()

  async function onSubmit(values: CollectionInput) {
    setError(undefined)

    startTransition(() => {
      setError(undefined)

      if (data) {
        updateCollection(data.id, values).catch((error) => {
          setError(error.message)
        })
      } else {
        postCollection(values).catch((error) => {
          setError(error.message)
        })
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <h1>Create a new collection</h1>
        <p className="text-sm text-muted-foreground">
          Add a title and description to create a new collection
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className={'space-y-6'} onSubmit={form.handleSubmit(onSubmit)}>
            <div className="fields space-y-6">
              <FormField
                disabled={isPending}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={'text'}
                        placeholder={
                          'Ex: Firebase, authentification des utilisateurs dans Vue.js'
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="title"
              />
              <FormField
                disabled={isPending}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={
                          'Ex: Firebase, authentification des utilisateurs dans Vue.js'
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="description"
              />

              <FormField
                disabled={isPending}
                control={form.control}
                name="is_private"
                render={({ field }) => (
                  <FormItem className="flex gap-x-2 items-center">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Make this collection private
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />

            <div className="form-actions flex justify-between">
              <Button
                type={'button'}
                variant="outline"
                onClick={() => {
                  form.reset()
                  router.push(PAGE_ROUTES.base)
                }}
              >
                Cancel
              </Button>
              <Button>
                {isPending && (
                  <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {data ? 'Update collection' : 'Create collection'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}