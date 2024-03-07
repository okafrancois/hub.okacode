// js object to store public and private routes

import {
  API_ROUTES,
  ApiRoute,
  PAGE_ROUTES,
  PageRoute,
} from '@/schemas/app-routes'

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {PAGE_ROUTES[]}
 */
export const publicRoutes: PageRoute[] | ApiRoute[] = []

/**
 * A, array of routes that are used for authentication
 * These routes will redirect to the user settings page if the user is already authenticated
 * @type {PageRoute[]}
 */
export const authRoutes: PageRoute[] = [
  PAGE_ROUTES.login,
  PAGE_ROUTES.register,
  PAGE_ROUTES.auth_error,
]

/**
 * The base prefix for the api authentication routes
 * Routes that start with this prefix ase used for authentication
 * @type {ApiRoute}
 */
export const apiAuthPrefix: ApiRoute = API_ROUTES.base_auth

/**
 * The default redirect route for authenticated users
 * Routes that start with this prefix are used for api routes
 * @type {PageRoute}
 */
export const DEFAULT_AUTH_REDIRECT: PageRoute = PAGE_ROUTES.base