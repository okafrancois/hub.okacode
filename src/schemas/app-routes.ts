export const API_ROUTES = {
  base: '/api',
  base_auth: '/api/auth',
  register_api: '/api/auth/register',
  login_api: '/api/auth/login',
} as const

export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES]

export const PAGE_ROUTES = {
  base: '/',
  register: '/auth/register',
  login: '/auth/login',
  auth_error: '/auth/error',
  user_settings: '/user-settings',
  user_settings_account: '/user-settings/account',
  user_settings_notifications: '/user-settings/notifications',
  my_collections: '/my-collections',
  community: '/community',
  new_collection: '/new-collection',
  collections: '/collections',
  edit_collection: (id: string) => `/collections/${id}/edit`,
} as const

export type PageRoute = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES]