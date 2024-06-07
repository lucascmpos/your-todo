import { auth } from '@/services/auth'
import { ProfileForm } from './_components/form'

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('Usuário não encontrado')
  }
  return <ProfileForm defaultValues={session.user} />
}
