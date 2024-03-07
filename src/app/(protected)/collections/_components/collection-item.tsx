import { ReactNode } from 'react'
import { Collection } from '@prisma/client'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { PAGE_ROUTES } from '@/schemas/app-routes'
import Link from 'next/link'

interface CollectionItemProps {
  data: Collection
}
export default function CollectionItem({
  data,
}: Readonly<CollectionItemProps>): ReactNode {
  return (
    <Card
      className={
        'rounded-xl flex flex-col border bg-card text-card-foreground shadow'
      }
    >
      <CardHeader
        className={'p-6 flex-grow flex flex-row items-start gap-4 space-y-0'}
      >
        <div className={'space-y-1 w-full'}>
          <CardTitle className={'font-semibold text-md'}>
            {data.title}
          </CardTitle>
          <CardDescription className={'text-sm text-muted-foreground'}>
            {data.description?.slice(0, 100)}
          </CardDescription>
        </div>
        <Button
          className={
            'w-max rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-none'
          }
        >
          <Icons.Star className="mr-2 h-4 w-4" />
          <Link href={PAGE_ROUTES.edit_collection(data.id)}>Edit</Link>
        </Button>
      </CardHeader>
      <CardFooter className={'flex space-x-4 text-sm text-muted-foreground'}>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Icons.Spinner className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            {data.authorId.slice(0, 5)}
          </div>
          <div className="flex items-center">
            <Icons.Star className="mr-1 h-3 w-3" />
            20k
          </div>
          <div>
            {data.createdAt.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}