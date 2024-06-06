import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarMain,
  SidebarNav,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarNavMain,
} from '@/components/dashboard/sidebar'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[14rem_1fr] gap-4">
      <Sidebar>
        <SidebarHeader>
          <SidebarHeaderTitle>
            <h1>Header</h1>
          </SidebarHeaderTitle>
        </SidebarHeader>
        <SidebarMain>
          <SidebarNav>
            <SidebarNavMain>
              <SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
              <SidebarNavLink href="/app">Tarefas</SidebarNavLink>
              <SidebarNavLink href="/app/settings">
                Configurações
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>

          <SidebarNav>
            <SidebarNavMain>
              <SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
              <SidebarNavLink href="/">Precisa de ajuda?</SidebarNavLink>
              <SidebarNavLink href="">Site</SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>
        </SidebarMain>
        <SidebarFooter>
          <h1>User</h1>
        </SidebarFooter>
      </Sidebar>
      <main>{children}</main>
    </div>
  )
}
