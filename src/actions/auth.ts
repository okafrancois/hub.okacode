'use server'

import { LoginInput, LoginSchema, SignUpSchema, SignUpInput } from '@/schemas'
import { signIn, signOut } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { getUserByEmail } from '@/lib/utils'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'
import { getVerificationTokenByToken } from '@/data/verification-token'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/prisma'

export const logUserIn = async (values: LoginInput) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    }
  }

  const { email, password } = validatedFields.data

  const userWithSameEmail = await getUserByEmail(email)

  if (
    !userWithSameEmail ||
    !userWithSameEmail.password ||
    !userWithSameEmail.email
  ) {
    return {
      error: 'Email not found',
    }
  }

  if (!userWithSameEmail.emailVerified) {
    const verificationToken = await generateVerificationToken(
      userWithSameEmail.email
    )

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return {
      success: 'Confirmation email sent, please verify your email address',
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'An error occurred' }
      }
    }

    throw error
  }
}

export const logUserOut = async () => {
  await signOut()
}

export const verifyEmail = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token)

  if (!verificationToken) {
    return {
      error: 'Invalid token',
    }
  }

  if (new Date() > verificationToken.expires) {
    return {
      error: 'Token expired',
    }
  }

  await db.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(new Date().getTime() + 3600 * 1000),
      email: verificationToken.email,
    },
  })

  return {
    success: 'Email verified',
  }
}

export const resetPassword = async (email: string) => {
  const user = await getUserByEmail(email)

  if (!user) {
    return {
      error: 'Email not found',
    }
  }

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: 'Confirmation email sent',
  }
}

export const changePassword = async (token: string, password: string) => {
  const verificationToken = await getVerificationTokenByToken(token)

  if (!verificationToken) {
    return {
      error: 'Invalid token',
    }
  }

  if (new Date() > verificationToken.expires) {
    return {
      error: 'Token expired',
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      password: hashedPassword,
      email: verificationToken.email,
    },
  })

  return {
    success: 'Password changed',
  }
}

export const register = async (values: SignUpInput) => {
  const validatedFields = SignUpSchema.safeParse(values)

  if (!validatedFields.success) {
    throw new Error('Invalid input')
  }

  const { email, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const userWithSameEmail = await getUserByEmail(email)

  if (userWithSameEmail) {
    throw new Error('User with same email already exists')
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return {
    success: 'Confirmation email sent',
  }
}