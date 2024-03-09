import { deleteCollection, getCollection } from '@/actions/collections'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PAGE_ROUTES } from '@/schemas/app-routes'
import { Collection, Ressource } from '@prisma/client'
import DeleteCollectionButton from '@/components/DeleteCollectionButton'
import RessourceForm from '@/components/ressource-form'
import { SeparatorHorizontal } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { getResourcesByCollection } from '@/actions/ressources'
import RessourceItem from '@/app/(protected)/collections/_components/ressource-item'

type PageProps = {
  params: {
    id?: string
  }
}
export default async function CollectionPage({ params }: Readonly<PageProps>) {
  if (!params.id) return null
  const collection = await getCollection(params.id)
  const ressources = await getResourcesByCollection(params.id)

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
      <CardContent>
        <RessourceForm />
        <Separator className={'my-4'} />
        <div className="ressources">
          {ressources.map((ressource: Ressource) => (
            <RessourceItem data={ressource} key={ressource.id} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}