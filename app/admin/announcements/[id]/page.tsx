import AnnouncementForm from '../AnnouncementForm'
export default function EditAnnouncementPage({ params }: { params: Promise<{ id: string }> }) {
  return <AnnouncementForm paramsPromise={params} />
}
