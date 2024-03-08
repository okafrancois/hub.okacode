import { ReactNode } from 'react'
import { Ressource, Tag } from '@prisma/client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { LinkIcon } from 'lucide-react'
import Image from 'next/image'

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
      <CardHeader className={'p-0'}>
        <a
          href={data.url}
          className="icon text-primary p-2 rounded-full border border-gray-300"
        >
          {data.icon ? (
            <img
              className={'w-4 h-4'}
              src={data.icon ?? ''}
              alt={'Link icon'}
            />
          ) : (
            <LinkIcon className="h-5 w-5" />
          )}
        </a>
      </CardHeader>
      <CardContent className={'space-y-4'}>
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