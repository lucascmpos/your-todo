import {
  DashboardPage,
  DashboardPageHeader,
  DashboardPageHeaderTitle,
  DashboardPageMain,
} from '@/components/dashboard/page'

import { PropsWithChildren } from 'react'
import { SettingsSidebar } from './_components/settings-sidebar'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <DashboardPageMain>
        <div className="container w-screen">
          <div className="grid grid-cols-[10rem_1fr] gap-10">
            <SettingsSidebar />
            <div className="w-1/2 flex justify-center">{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
