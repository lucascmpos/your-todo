import { cn } from '@/lib/utils'
import Link from 'next/link'

export type SidebarGenericProps<T = unknown> = {
  children: React.ReactNode
  className?: string
} & T

export function Sidebar({ className, children }: SidebarGenericProps) {
  return (
    <aside
      className={cn([
        'border-r border-border flex flex-col space-y-6 ',
        className,
      ])}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, children }: SidebarGenericProps) {
  return (
    <header className={cn(['py-3 px-4 border-b border-border', className])}>
      {children}
    </header>
  )
}

export function SidebarHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return <header className={cn(['', className])}>{children}</header>
}

export function SidebarMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(['pt-6 px-3', className])}>{children}</main>
}

export function SidebarNav({ className, children }: SidebarGenericProps) {
  return <nav className={cn(['px', className])}>{children}</nav>
}

export function SidebarNavHeader({ className, children }: SidebarGenericProps) {
  return <header className={cn(['', className])}>{children}</header>
}

export function SidebarNavHeaderTitle({
  className,
  children,
}: SidebarGenericProps) {
  return (
    <span
      className={cn([
        'text-xs uppercase text-muted-foreground ml-3',
        className,
      ])}
    >
      {children}
    </span>
  )
}

export function SidebarNavMain({ className, children }: SidebarGenericProps) {
  return <main className={cn(['flex flex-col', className])}>{children}</main>
}

type SideBarNavLinkProps = {
  href: string
  active?: boolean
}

export function SidebarNavLink({
  className,
  children,
  href,
  active,
}: SidebarGenericProps<SideBarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn([
        'font-semibold lg:w-auto w-1/3 text-xs px-3 py-2 rounded-md transition-all flex items-center gap-2 duration-100',
        active && 'bg-primary text-white',
        className,
      ])}
    >
      {children}
    </Link>
  )
}

export function SidebarFooter({ className, children }: SidebarGenericProps) {
  return (
    <footer className={cn(['p-6 border-t border-border mt-auto', className])}>
      {children}
    </footer>
  )
}
