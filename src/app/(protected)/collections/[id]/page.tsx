type PageProps = {
  params: {
    id?: string
  }
}
export default function NewCollectionPage({ params }: PageProps) {
  return (
    <div className={'container py-[2rem]'}>
      <h1>Current collection {params.id}</h1>
    </div>
  )
}