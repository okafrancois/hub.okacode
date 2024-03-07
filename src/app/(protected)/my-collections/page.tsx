import { getCollections } from '@/actions/collections'
import CollectionItem from '@/app/(protected)/collections/_components/collection-item'

export default async function UserCollectionsListingPage() {
  const userCollection = await getCollections()

  console.log(userCollection)
  return (
    <div className={'container py-[2rem]'}>
      <h1 className={'mb-4'}>All user collections</h1>
      <div className={'grid grid-cols-3 gap-4'}>
        {userCollection.map((collection) => (
          <CollectionItem data={collection} key={collection.id} />
        ))}
      </div>
    </div>
  )
}