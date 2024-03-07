import { getCollection } from '@/actions/collections'
import CollectionForm from '@/components/collection-form'

type EditCollectionPageParams = {
  params: {
    id?: string
  }
}
export default async function EditCollectionPage({
  params,
}: Readonly<EditCollectionPageParams>) {
  const { id } = params

  if (!id) {
    return null
  }
  const collection = await getCollection(id)

  if (!collection) {
    return null
  }

  return (
    <div className={'container py-[2rem]'}>
      <h1>Edit collection</h1>
      <CollectionForm data={collection} />
    </div>
  )
}