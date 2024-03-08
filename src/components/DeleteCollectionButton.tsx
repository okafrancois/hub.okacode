'use client'

import { deleteCollection } from '@/actions/collections'
import { Button } from '@/components/ui/button'

export default function DeleteCollectionButton({
  id,
}: Readonly<{ id: string }>) {
  const handleDelete = async () => {
    await deleteCollection(id)
  }
  return (
    <Button onClick={() => handleDelete()} type={'button'} variant={'outline'}>
      Delete
    </Button>
  )
}