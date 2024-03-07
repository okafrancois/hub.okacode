import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import SideBar from '@/components/side-bar'

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <div className="container-full flex w-[100vw] overflow-hidden h-[100vh]">
        <SideBar />
        <main className={'w-full overflow-auto min-h-[100vh] bg-muted'}>
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}