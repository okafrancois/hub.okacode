import { getUserById } from '@/lib/user'
import { UserSettingsInput } from '@/schemas'
import { db } from '@/lib/prisma'
import { auth } from '@/auth'

export const updateUserSettings = async (values: UserSettingsInput) => {
  const user = await getCurrentUser()

  if (!user) {
    return {
      error: 'User not found',
    }
  }

  const bdUser = await getUserById(user.id)

  if (!bdUser) {
    return {
      error: 'User not found',
    }
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      ...values,
    },
  })

  return {
    success: 'User updated',
  }
}

export const getCurrentUser = async () => {
  const session = await auth()

  return session?.user
}