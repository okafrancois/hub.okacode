import { Icons } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'

export default function UnauthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-[100vh] w-full overflow-hidden">
      <nav className={'fixed w-full py-4 flex justify-between'}>
        <Icons.Logo className="w-auto h-10" />
        <ModeToggle />
      </nav>
      <main
        className={'flex flex-col items-center justify-center h-[100vh] w-full'}
      >
        {children}
      </main>
    </div>
  )
}