'use server'

import { CollectionInput, CollectionSchema } from '@/schemas'
import { db } from '@/lib/prisma'
import { Visibility } from '@prisma/client'
import { getCurrentUser } from '@/actions/user'
import { redirect } from 'next/navigation'
import { PAGE_ROUTES } from '@/schemas/app-routes'

export const postCollection = async (values: CollectionInput) => {
  const validValues = CollectionSchema.safeParse(values)

  if (!validValues.success) {
    throw new Error('Invalid fields')
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error('User not found')
  }

  await db.collection.create({
    data: {
      title: validValues.data.title,
      visibility: validValues.data.is_private
        ? Visibility.PRIVATE
        : Visibility.PUBLIC,
      description: validValues.data.description,
      authorId: currentUser.id,
      authorUsername: currentUser.username ?? currentUser.name ?? 'Anonymous',
    },
  })

  redirect(PAGE_ROUTES.my_collections)
}

export const updateCollection = async (id: string, values: CollectionInput) => {
  const validValues = CollectionSchema.safeParse(values)

  if (!validValues.success) {
    throw new Error('Invalid fields')
  }

  await db.collection.update({
    where: {
      id,
    },
    data: {
      title: validValues.data.title,
      visibility: validValues.data.is_private
        ? Visibility.PRIVATE
        : Visibility.PUBLIC,
      description: validValues.data.description,
    },
  })

  redirect(PAGE_ROUTES.my_collections)
}

export const getCollections = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error('User not found')
  }

  return db.collection.findMany({
    where: {
      authorId: currentUser.id,
    },
  })
}

export const getCollection = async (id: string) => {
  return db.collection.findUnique({
    where: {
      id,
    },
  })
}

export const deleteCollection = async (id: string) => {
  await db.collection.delete({
    where: {
      id,
    },
  })

  redirect(PAGE_ROUTES.my_collections)
}