import AccommodationForm from '../AccommodationForm'
export default function EditAccommodationPage({ params }: { params: Promise<{ id: string }> }) {
  return <AccommodationForm paramsPromise={params} />
}
