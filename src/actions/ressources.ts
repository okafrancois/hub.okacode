'use server'

import { RessourceInput, RessourceSchema } from '@/schemas'
import { getCurrentUser } from '@/actions/user'
import { db } from '@/lib/prisma'

export async function postResource(values: RessourceInput) {
  const validValues = RessourceSchema.safeParse(values)

  if (!validValues.success) {
    throw new Error('Invalid fields')
  }

  const currentUser = await getCurrentUser()

  if (!currentUser) {
    throw new Error('User not found')
  }

  // Check if the collection exists
  const collection = await db.collection.findUnique({
    where: {
      id: validValues.data.collectionId,
    },
  })

  if (!collection) {
    throw new Error('Collection not found')
  }

  const icon = await fetch(
    `https://www.google.com/s2/favicons?domain=${validValues.data.url}&sz=64`
  )

  return db.ressource.create({
    data: {
      icon: icon.url,
      url: validValues.data.url,
      description: validValues.data.description,
      collection: {
        connect: {
          id: validValues.data.collectionId,
        },
      },
      tags: {
        create:
          validValues.data.tags
            ?.toLowerCase()
            .trim()
            .split(',')
            .map((tag) => ({ name: tag })) ?? [],
      },
    },
  })
}

export async function getResourcesByCollection(collectionId: string) {
  return db.ressource.findMany({
    where: {
      collectionId,
    },
    include: {
      tags: true,
    },
  })
}

export async function updateResource(id: string, values: RessourceInput) {
  const validValues = RessourceSchema.safeParse(values)

  if (!validValues.success) {
    throw new Error('Invalid fields')
  }

  // retrive the icon from the url

  return db.ressource.update({
    where: {
      id,
    },
    data: {
      url: validValues.data.url,
      description: validValues.data.description,
      tags: {
        create:
          validValues.data.tags
            ?.toLowerCase()
            .trim()
            .split(',')
            .map((tag) => ({ name: tag })) ?? [],
      },
    },
  })
}

export async function deleteResource(id: string) {
  console.log('deleteResource', id)
  return db.ressource.delete({
    where: {
      id,
    },
  })
}