// js object to store public and private routes

import { apiRoutes, pagesRoutes } from '@/schemas/app-routes'

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {pagesRoutes[]}
 */
export const publicRoutes: pagesRoutes[] | apiRoutes[] = []

/**
 * A, array of routes that are used for authentication
 * These routes will redirect to the user settings page if the user is already authenticated
 * @type {pagesRoutes[]}
 */
export const authRoutes: pagesRoutes[] = [
  pagesRoutes.login,
  pagesRoutes.register,
  pagesRoutes.auth_error,
]

/**
 * The base prefix for the api authentication routes
 * Routes that start with this prefix ase used for authentication
 * @type {apiRoutes}
 */
export const apiAuthPrefix: apiRoutes = apiRoutes.base_auth

/**
 * The default redirect route for authenticated users
 * Routes that start with this prefix are used for api routes
 * @type {pagesRoutes}
 */
export const DEFAULT_AUTH_REDIRECT: pagesRoutes = pagesRoutes.base