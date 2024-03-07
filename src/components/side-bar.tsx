'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { LogoutForm } from '@/components/logout-form'
import { useCurrentUser } from '@/hooks/use-current-user'
import { PAGE_ROUTES, PageRoute } from '@/schemas/app-routes'
import { ModeToggle } from '@/components/mode-toggle'

export default function SideBar() {
  const user = useCurrentUser()

  return (
    <aside
      className={'border border-gray-100 p-8 flex space-y-6 flex-col w-[300px]'}
    >
      <div className="side-bar-logo">
        <Icons.Logo className="h-10 w-max" />
      </div>
      <div className="content flex-1">
        <NavMenu />
      </div>
      <div className="sidebar-footer flex flex-col space-y-4">
        <ModeToggle />
        <span className={'text-sm text-muted-foreground'}>
          Logged in as {user?.name}
        </span>
        <LogoutForm />
      </div>
    </aside>
  )
}

const navItems: {
  title: string
  href: PageRoute
}[] = [
  { title: 'My Collections', href: PAGE_ROUTES.my_collections },
  { title: 'Create Collection', href: PAGE_ROUTES.new_collection },
  { title: 'Community Collections', href: PAGE_ROUTES.community },
  { title: 'Community', href: PAGE_ROUTES.community },
  { title: 'User Settings', href: PAGE_ROUTES.user_settings },
]
interface NavMenuProps extends React.HTMLAttributes<HTMLElement> {}
function NavMenu({ className, ...props }: NavMenuProps) {
  const pathname = usePathname()
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-muted',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}