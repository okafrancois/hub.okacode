'use client'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { LogoutForm } from '@/components/logout-form'
import { useCurrentUser } from '@/hooks/use-current-user'

export default function SideBar() {
  const user = useCurrentUser()

  console.log('user', user)

  return (
    <aside className={'p-8 flex space-y-6 flex-col w-[300px]'}>
      <div className="side-bar-logo">
        <Icons.Logo className="h-10 w-max" />
      </div>
      <div className="content flex-1">
        <NavMenu />
      </div>
      <div className="sidebar-footer space-y-4">
        <span className={'text-sm text-muted-foreground'}>
          Logged in as {user?.name}
        </span>
        <LogoutForm />
      </div>
    </aside>
  )
}

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'User Settings', href: '/user-settings' },
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
          href={`${item.href}`}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-muted hover:bg-muted'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}