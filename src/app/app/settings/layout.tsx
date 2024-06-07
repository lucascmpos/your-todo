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
        <div className="container lg:w-screen">
          <div className="lg:grid lg:grid-cols-[12rem_1fr] flex flex-col gap-10">
            <SettingsSidebar />
            <div className="w-[50vw] flex justify-center">{children}</div>
          </div>
        </div>
      </DashboardPageMain>
    </DashboardPage>
  )
}
