import * as z from 'zod'

export const UserSettingsSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  name: z.string({
    required_error: 'Name is required',
  }),
  image: z
    .string({
      required_error: 'Image is required',
    })
    .url({
      message: 'Invalid URL',
    }),
})

export type UserSettingsInput = z.infer<typeof UserSettingsSchema>

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8),
})

export type LoginInput = z.infer<typeof LoginSchema>

export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email address',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(8),
  repeatPassword: z
    .string({
      required_error: 'Repeat password is required',
    })
    .min(8),
})

export type SignUpInput = z.infer<typeof SignUpSchema>

export const CollectionSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description is required',
  }),
  is_private: z.boolean().default(false),
})

export type CollectionInput = z.infer<typeof CollectionSchema>

export const RessourceSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
  tags: z.string().optional(),
  collectionId: z.string(),
})

export type RessourceInput = z.infer<typeof RessourceSchema>