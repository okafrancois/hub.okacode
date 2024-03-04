import * as z from 'zod'

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
  username: z
    .string({
      required_error: 'Username is required',
    })
    .max(15)
    .regex(/^['a-zA-Z0-9_']+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
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