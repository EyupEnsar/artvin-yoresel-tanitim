import MemberForm from '../MemberForm'

export default function EditMemberPage({ params }: { params: Promise<{ id: string }> }) {
  return <MemberForm paramsPromise={params} />
}
