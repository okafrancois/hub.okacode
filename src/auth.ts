import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from '@/lib/prisma'
import { getUserById } from '@/lib/utils'
import { User, USerRole } from '@prisma/client'
import { pagesRoutes } from '@/schemas/app-routes'

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
    signIn: pagesRoutes.login,
    error: pagesRoutes.auth_error,
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

      // 2FA check

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
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

      return token
    },
  },
  session: { strategy: 'jwt' },
  ...authConfig,
})