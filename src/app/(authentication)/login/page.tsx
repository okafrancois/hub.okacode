import { LoginForm } from '@/components/login-form'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { pagesRoutes } from '@/schemas/routes'

export default function LoginPage() {
  return (
    <>
      <Link
        href={pagesRoutes.register}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Register
      </Link>
      <LoginForm />
    </>
  )
}