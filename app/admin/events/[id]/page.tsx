import EventForm from '../EventForm'
export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  return <EventForm paramsPromise={params} />
}
