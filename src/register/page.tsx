import { RegisterForm } from '@/components/register-form'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { PAGE_ROUTES } from '@/schemas/app-routes'

export default function RegisterPage() {
  return (
    <>
      <Link
        href={PAGE_ROUTES.login}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <RegisterForm />
    </>
  )
}