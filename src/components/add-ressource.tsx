'use client'

import { Button } from '@/components/ui/button'
import { PlusIcon } from '@radix-ui/react-icons'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormError } from '@/components/form-error'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { RessourceInput, RessourceSchema } from '@/schemas'
import { postResource } from '@/actions/ressources'
import { useParams, useRouter } from 'next/navigation'
import { Icons } from '@/components/icons'

export default function AddRessource() {
  const [modalOpen, setModalOpen] = React.useState(false)

  function onClickOutside(event: MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      event.target.classList.contains('model-wrapper')
    ) {
      setModalOpen(false)
    }
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.addEventListener('click', onClickOutside)
    } else {
      document.body.removeEventListener('click', onClickOutside)
    }
    return () => {
      document.body.removeEventListener('click', onClickOutside)
    }
  }, [modalOpen])

  return (
    <div className={'add-ressource-wrapper'}>
      <Button
        onClick={() => {
          setModalOpen(!modalOpen)
        }}
        type={'button'}
      >
        <PlusIcon className={'mr-2 h-4 w-4'} />
        Add Ressource
      </Button>
      {modalOpen && <AddRessourceForm onClose={() => setModalOpen(false)} />}
    </div>
  )
}

type AddRessourceFormProps = {
  onClose?: () => void
}

export function AddRessourceForm({ onClose }: Readonly<AddRessourceFormProps>) {
  const router = useRouter()
  const paramsItem = useParams<{ id: string }>()
  const [error, setError] = React.useState<string | undefined>()
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<RessourceInput>({
    resolver: zodResolver(RessourceSchema),
    defaultValues: {
      url: '',
      tags: '',
      description: '',
      collectionId: '',
    },
  })
  async function onSubmit(values: RessourceInput) {
    startTransition(() => {
      setError(undefined)
      postResource(values)
        .then(() => {
          // refresh current segment
          router.refresh()
          onClose?.()
        })
        .catch((error: Error) => {
          setError(error.message)
        })
    })
  }

  useEffect(() => {
    if (paramsItem.id) form.setValue('collectionId', paramsItem.id)
  }, [paramsItem, form])

  useEffect(() => {
    form.setFocus('url')
  }, [form])

  return (
    <div
      className={
        'fixed top-0 left-0 w-full model-wrapper h-full flex items-center justify-center'
      }
    >
      <Card className={'max-w-[430px] w-full'}>
        <CardHeader className={'relative'}>
          <h1>Add new ressource</h1>
          <p className="text-sm text-muted-foreground">
            Include a new ressource
          </p>
          <Button
            onClick={() => {
              onClose?.()
            }}
            type={'button'}
            className={'absolute top-2 right-2'}
            variant={'ghost'}
          >
            Close
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className={'space-y-6'}
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="fields space-y-6">
                <FormField
                  disabled={isPending}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Input
                          required={true}
                          {...field}
                          placeholder={'https://example.com'}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="url"
                />
                <FormField
                  disabled={isPending}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={'tag1, tag2, tag3'} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  name="tags"
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
              </div>
              <FormError message={error} />

              <div className="actions flex gap-2">
                <Button
                  disabled={isPending}
                  onClick={() => {
                    onClose?.()
                  }}
                  type={'button'}
                  className={'w-full'}
                  variant={'outline'}
                >
                  Cancel
                </Button>
                <Button
                  type={'submit'}
                  disabled={isPending}
                  className={'w-full'}
                >
                  {isPending && (
                    <Icons.Spinner className={'mr-2 h-6 w-6 animate-spin'} />
                  )}
                  Add ressource
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}