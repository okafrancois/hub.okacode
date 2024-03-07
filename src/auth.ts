import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/prisma'
import { User, USerRole } from '@prisma/client'
import { PAGE_ROUTES } from '@/schemas/app-routes'
import { getUserById } from '@/lib/user'
import authConfig from '@/auth.config'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    signIn: PAGE_ROUTES.login,
    error: PAGE_ROUTES.auth_error,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id as string)

      // If the user is not verified, prevent them from signing in
      if (!existingUser?.emailVerified) return false

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        const existingUser = await getUserById(token.sub)

        if (existingUser) {
          session.user = {
            ...session.user,
            bio: existingUser.bio ?? '',
            username: existingUser.username ?? 'testusername',
          }
        }

        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as USerRole
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)

      if (!existingUser) {
        return token
      }

      token.role = existingUser.role
      token.bio = existingUser.bio

      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})