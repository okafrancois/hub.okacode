import { ReactNode } from 'react'
import { Ressource, Tag } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import RessourceActions from '@/app/(protected)/collections/_components/ressources-actions'

interface CollectionItemProps {
  data: Ressource
}
export default function RessourceItem({
  data,
}: Readonly<CollectionItemProps>): ReactNode {
  return (
    <Card
      className={'flex bg-card text-card-foreground border-none shadow-none'}
    >
      <CardHeader className={'p-0 space-y-0 flex-row items-start'}>
        <div className="actions gap-x-2 flex items-center">
          <RessourceActions data={data} />
          <a
            href={data.url}
            className="icon text-primary aspect-square p-2 rounded-full border border-gray-300"
          >
            <img className={'w-5 h-5'} src={data.icon ?? ''} alt={'Icon'} />
          </a>
        </div>
      </CardHeader>
      <CardContent className={'relative space-y-4 pl-2'}>
        <div className={'spacey-2'}>
          <CardTitle className={'text-md'}>
            <a href={data.url}>{data.url}</a>
          </CardTitle>
          <CardDescription className={'text-sm text-muted-foreground'}>
            {data.description?.slice(0, 100)}
          </CardDescription>
        </div>
        <div className="flex space-x-2 text-sm text-muted-foreground">
          {/* @ts-expect-error TODO: adjust the tags model*/}
          {data.tags?.map((tag: Tag) => (
            <span className={'bg-primary-foreground px-2 rounded'} key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}