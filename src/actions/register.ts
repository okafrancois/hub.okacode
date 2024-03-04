'use server'

import bcrypt from 'bcryptjs'
import { SignUpInput, SignUpSchema } from '@/schemas'
import { db } from '@/lib/prisma'
import { getUserByEmail, getUserByUsername } from '@/lib/utils'

export const register = async (values: SignUpInput) => {
  const validatedFields = SignUpSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error('Invalid input')
  }

  const { email, password, username } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const userWithSameEmail = await getUserByEmail(email)

  if (userWithSameEmail) {
    throw new Error('User with same email already exists')
  }

  const userWithSameUsername = await getUserByUsername(username)

  if (userWithSameUsername) {
    throw new Error('User with same username already exists')
  }

  await db.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
    },
  })

  return {
    success: 'Signed up successfully',
  }
}