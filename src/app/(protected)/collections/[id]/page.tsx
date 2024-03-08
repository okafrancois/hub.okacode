import { deleteCollection, getCollection } from '@/actions/collections'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PAGE_ROUTES } from '@/schemas/app-routes'
import { Collection } from '@prisma/client'
import DeleteCollectionButton from '@/components/DeleteCollectionButton'

type PageProps = {
  params: {
    id?: string
  }
}
export default async function CollectionPage({ params }: Readonly<PageProps>) {
  if (!params.id) return null
  const collection = await getCollection(params.id)

  if (!collection) return null

  return (
    <Card className={'m-[2rem]'}>
      <CardHeader
        className={'flex -space-y-0 align-top flex-row justify-between'}
      >
        <div>
          <CardTitle>{collection.title}</CardTitle>
          <CardDescription>{collection.description}</CardDescription>
        </div>
        <div className={'actions flex gap-2'}>
          <Button type={'button'} variant={'secondary'}>
            <Link href={PAGE_ROUTES.edit_collection(collection.id)}>Edit</Link>
          </Button>
          <DeleteCollectionButton id={collection.id} />
        </div>
      </CardHeader>
    </Card>
  )
}