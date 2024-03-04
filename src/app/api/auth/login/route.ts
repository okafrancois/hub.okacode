import { NextApiRequest, NextApiResponse } from 'next'
import { LoginInput, LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { User } from '@prisma/client'
import { NextResponse } from 'next/server'

// POST /api/auth/login

export async function POST(request: NextApiRequest) {
  const body = request.body as LoginInput

  const validatedFields = LoginSchema.safeParse(body)

  if (!validatedFields.success) {
    return NextResponse.json(
      {
        error: 'Invalid fields',
      },
      {
        status: 400,
      }
    )
  }

  const { email, password } = validatedFields.data

  try {
    const user = await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return NextResponse.json(
            {
              error: error.message,
            },
            {
              status: 400,
            }
          )
        }
        default: {
          return NextResponse.json(
            {
              error: 'An error occurred',
            },
            {
              status: 500,
            }
          )
        }
      }
    }

    throw error
  }
}