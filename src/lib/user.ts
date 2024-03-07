import { User } from '@prisma/client'
import { db } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    return await db.user.findFirst({
      where: {
        email: email,
      },
    })
  } catch {
    return null
  }
}

export async function getUserByUsername(
  username: string
): Promise<User | null> {
  try {
    return await db.user.findFirst({
      where: {
        username: username,
      },
    })
  } catch {
    return null
  }
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    return await db.user.findFirst({
      where: {
        id: id,
      },
    })
  } catch {
    return null
  }
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return await db.verificationToken.findFirst({
      where: {
        email,
      },
    })
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return await db.verificationToken.findUnique({
      where: {
        token,
      },
    })
  } catch {
    return null
  }
}

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        identifier: existingToken.identifier,
      },
    })
  }

  return await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })
}