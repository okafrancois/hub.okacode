'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Icons } from '@/components/icons'
import { useRouter } from 'next/navigation'
import { pagesRoutes } from '@/schemas/app-routes'

type CardProps = React.ComponentProps<typeof Card>

export function ErrorCard({ className, ...props }: CardProps) {
  const router = useRouter()

  return (
    <Card className={cn('w-[380px] mx-auto', className)} {...props}>
      <CardHeader>
        <CardTitle className={'mb-2'}>Oops, something went wrong</CardTitle>
        <CardDescription>
          We were unable to sign you in. Please try again later.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={() => {
            router.push(pagesRoutes.login)
          }}
        >
          <Icons.Back /> Back to login
        </Button>
      </CardFooter>
    </Card>
  )
}