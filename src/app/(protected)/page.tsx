import { getCollections } from '@/actions/collections'
import CollectionItem from '@/app/(protected)/collections/_components/collection-item'

export default async function UserCollectionsListingPage() {
  const collections = await getCollections()

  return (
    <div className={'container py-[2rem]'}>
      <h1 className={'mb-4'}>All user collections</h1>
      <div className={'grid grid-cols-3 gap-4'}>
        {collections.map((collection) => (
          <CollectionItem data={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}