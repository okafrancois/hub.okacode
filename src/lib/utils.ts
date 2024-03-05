import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { db } from '@/lib/prisma'
import { User } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

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