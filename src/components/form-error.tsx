import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

type FormErrorProps = {
  message?: string
}

export function FormError({ message }: Readonly<FormErrorProps>) {
  return (
    <>
      {message && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center space-x-2 text-sm text-destructive">
          <ExclamationTriangleIcon className={'h-4 w-4'} />
          <p>{message}</p>
        </div>
      )}
    </>
  )
}