import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()
  return (
    <div className="lg:grid lg:grid-cols-[18rem_1fr] flex flex-col  ">
      {session?.user ? <MainSidebar user={session.user} /> : null}
      <main>{children}</main>
    </div>
  )
}
