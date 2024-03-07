import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_AUTH_REDIRECT,
  publicRoutes,
} from '@/routes'
import { PAGE_ROUTES } from '@/schemas/app-routes'

const { auth } = NextAuth(authConfig)
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname as PAGE_ROUTES)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
    }

    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(PAGE_ROUTES.login, nextUrl))
  }
})
// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}