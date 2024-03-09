'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ressource } from '@prisma/client'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { deleteResource } from '@/actions/ressources'
import { useRouter } from 'next/navigation'

type RessourceActionsProps = {
  data: Ressource
}
export default function RessourceActions({
  data,
}: Readonly<RessourceActionsProps>) {
  const router = useRouter()

  const handleDelete = () => {
    deleteResource(data.id).then(() => {
      router.refresh()
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={'text-bold'}>
        <DotsVerticalIcon className={'w-4 h-4'} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        align={'start'}
      >
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDelete()}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}