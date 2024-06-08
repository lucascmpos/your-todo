import { useSession } from 'next-auth/react'
import SettingsPage from '../page'

export default function SettingsContainer() {
  const { data } = useSession()

  if (!data?.user) {
    return <p>Usuário não encontrado</p>
  }

  return <SettingsPage user={data.user} />
}