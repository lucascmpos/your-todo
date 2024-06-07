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

import {
  GithubIcon,
  Linkedin,
  Settings2,
  SquareGanttChart,
  SquareUserIcon,
} from 'lucide-react'

import { usePathname } from 'next/navigation'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logo'
import { Session } from 'next-auth'
import Link from 'next/link'

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

      <SidebarMain className="flex flex-col gap-10 lg:gap-0 lg:flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavHeaderTitle>Ferramentas</SidebarNavHeaderTitle>
            <SidebarNavLink href="/app" active={isActive('/app')}>
              <SquareGanttChart size={20} />
              Tarefas
            </SidebarNavLink>
            <SidebarNavLink
              href="/app/settings"
              active={
                isActive('/app/settings') ||
                isActive('/app/settings/theme') ||
                isActive('/app/settings/billing')
              }
            >
              <Settings2 size={20} />
              Configurações
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto ">
          <SidebarNavMain className="space-y-2">
            <SidebarNavHeaderTitle>YOUR TODO DEV</SidebarNavHeaderTitle>
            <Link
              className="text-sm items-center hover:text-primary font-semibold flex gap-2 ml-3"
              href="https://lucascampos-portfolio.vercel.app"
              target="_blank"
            >
              <SquareUserIcon size={20} />
              Portfolio
            </Link>

            <Link
              className="text-sm items-center hover:text-primary font-semibold flex gap-2 ml-3"
              href="https://github.com/lucascmpos"
              target="_blank"
            >
              <GithubIcon size={20} />
              GitHub
            </Link>

            <Link
              className="text-sm items-center hover:text-primary font-semibold flex gap-2 ml-3"
              href="https://github.com/lucascmpos"
              target="_blank"
            >
              <Linkedin size={20} />
              LinkedIn
            </Link>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-auto">
          <SidebarNavMain>
            <SidebarNavHeaderTitle>Links extras</SidebarNavHeaderTitle>
            <SidebarNavLink href="/">Precisa de ajuda?</SidebarNavLink>
            <Link
              className="text-xs hover:text-primary font-semibold ml-3"
              target="_blank"
              href="https://github.com/lucascmpos/your-todo"
            >
              Acesse o repositório desse app
            </Link>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <UserDropdown user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
