import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[14rem_1fr] ">
      <MainSidebar />
      <main>{children}</main>
    </div>
  )
}
