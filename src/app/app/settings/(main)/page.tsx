import { auth } from '@/services/auth'
import { ProfileForm } from './_components/form'

export default async function SettingsPage() {
  const session = await auth()
  return <ProfileForm defaultValues={session?.user} />
}