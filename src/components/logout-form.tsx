import { Button } from '@/components/ui/button'
import { logUserOut } from '@/actions/auth'

export function LogoutForm() {
  return (
    <Button
      onClick={async () => {
        await logUserOut()
      }}
      type={'button'}
      variant={'outline'}
      className={'w-max'}
    >
      Sign out
    </Button>
  )
}