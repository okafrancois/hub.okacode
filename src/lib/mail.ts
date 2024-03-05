import { Resend } from 'resend'
import { pagesRoutes } from '@/schemas/app-routes'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `http://localhost:3000${pagesRoutes.login}?email_token=${token}`

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verify your email',
    text: `Click the <a href=${confirmationLink}>link</a> to verify your email.`,
  })
}