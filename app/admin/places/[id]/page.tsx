import PlaceForm from '../PlaceForm'
export default function EditPlacePage({ params }: { params: Promise<{ id: string }> }) {
  return <PlaceForm paramsPromise={params} />
}
