'use client'

import * as React from 'react'
import * as DropDown from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Form from '@/components/ui/form'
import { FormError } from '@/components/form-error'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useEffect } from 'react'
import { RessourceInput, RessourceSchema } from '@/schemas'
import { postResource } from '@/actions/ressources'
import { useParams, useRouter } from 'next/navigation'
import { Ressource } from '@prisma/client'
import { Icons } from '@/components/icons'

type RessourceActionsProps = {
  data?: Ressource
}
export default function RessourceForm({
  data,
}: Readonly<RessourceActionsProps>) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropDown.DropdownMenu open={open}>
      <DropDown.DropdownMenuTrigger className={'text-bold'}>
        <Button
          onClick={() => {
            setOpen(!open)
          }}
          type={'button'}
          variant={'secondary'}
        >
          Add ressource
        </Button>
      </DropDown.DropdownMenuTrigger>
      <DropDown.DropdownMenuContent
        onInteractOutside={() => setOpen(false)}
        onCloseAutoFocus={(e) => e.preventDefault()}
        align={'start'}
      >
        <DropDown.DropdownMenuLabel>
          {data ? 'Edit ressource' : 'Add new ressource'}
        </DropDown.DropdownMenuLabel>
        <DropDown.DropdownMenuSeparator />
        <RessourceFormContent
          onSubmitSuccess={() => setOpen(false)}
          data={data}
        />
      </DropDown.DropdownMenuContent>
    </DropDown.DropdownMenu>
  )
}

type FormContentProps = {
  data?: Ressource
  onSubmitSuccess?: () => void
}
export function RessourceFormContent({
  data,
  onSubmitSuccess,
}: Readonly<FormContentProps>) {
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

  useEffect(() => {
    if (paramsItem.id) form.setValue('collectionId', paramsItem.id)
  }, [paramsItem, form])

  useEffect(() => {
    form.setFocus('url')
  }, [form])

  async function onSubmit(values: RessourceInput) {
    startTransition(() => {
      setError(undefined)
      postResource(values)
        .then(() => {
          router.refresh()
          onSubmitSuccess?.()
        })
        .catch((error: Error) => {
          setError(error.message)
        })
    })
  }

  return (
    <div
      className={'add-ressource-wrapper p-4 w-full min-w-[400px] max-w-[400px]'}
    >
      <Form.Form {...form}>
        <form className={'space-y-6'} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="fields space-y-6">
            <Form.FormField
              disabled={isPending}
              control={form.control}
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Url</Form.FormLabel>
                  <Form.FormControl>
                    <Input
                      required={true}
                      {...field}
                      placeholder={'https://example.com'}
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
              name="url"
            />
            <Form.FormField
              disabled={isPending}
              control={form.control}
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Description</Form.FormLabel>
                  <Form.FormControl>
                    <Textarea
                      {...field}
                      placeholder={
                        'Ex: Firebase, authentification des utilisateurs dans Vue.js'
                      }
                    />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
              name="description"
            />
            <Form.FormField
              disabled={isPending}
              control={form.control}
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Tags</Form.FormLabel>
                  <Form.FormControl>
                    <Input {...field} placeholder={'tag1, tag2, tag3'} />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
              name="tags"
            />
          </div>
          <FormError message={error} />
          <div className="actions">
            <Button type={'submit'} disabled={isPending} className={'w-full'}>
              {isPending && (
                <Icons.Spinner className={'mr-2 h-4 w-4 animate-spin'} />
              )}
              Add ressource
            </Button>
          </div>
        </form>
      </Form.Form>
    </div>
  )
}