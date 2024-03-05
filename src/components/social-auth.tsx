import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import React from 'react'
import { signIn } from 'next-auth/react'
import { DEFAULT_AUTH_REDIRECT } from '@/routes'

export default function SocialAuth() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: DEFAULT_AUTH_REDIRECT })
  }
  return (
    <div className="links flex w-full justify-center gap-2">
      <Button
        onClick={() => onClick('github')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Github className="mr-2 h-4 w-4" />
        )}{' '}
        GitHub
      </Button>
      <Button
        onClick={() => onClick('google')}
        variant="outline"
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}{' '}
        Google
      </Button>
    </div>
  )
}