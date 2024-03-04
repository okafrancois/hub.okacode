'use server'

import { LoginInput, LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const logUserIn = async (values: LoginInput) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error('Invalid input')
  }

  const { email, password } = validatedFields.data

  try {
    const response = await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    })

    console.log(response)

    return {
      success: 'Logged in successfully',
    }
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        throw new Error(error.message)
      } else {
        throw new Error('An error occurred')
      }
    }

    throw error
  }
}