'use client'
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

import { Settings2, SquareGanttChart } from 'lucide-react'

import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logo'
import { Session } from 'next-auth'

type MainSidebarProps = {
  user: Session['user']
}
export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  if (!user) return
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarHeaderTitle>
          <Logo />
        </SidebarHeaderTitle>
      </SidebarHeader>

      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/app" active={isActive('/app')}>
              <SquareGanttChart size={20} />
              Tarefas
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/settings"
              active={isActive('/app/settings')}
            >
              <Settings2 size={20} />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
          <SidebarNavMain>
            <SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
            <SidebarNavLink href="/">Precisa de ajuda?</SidebarNavLink>
            <SidebarNavLink href="">Site</SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
