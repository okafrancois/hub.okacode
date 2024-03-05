import { signOut } from '@/auth'
import { getCurrentUser } from '@/lib/auth'

export default async function LogoutForm() {
  const user = await getCurrentUser()
  return (
    <div>
      {JSON.stringify(user)}
      <form
        action={async () => {
          'use server'

          await signOut()
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  )
}