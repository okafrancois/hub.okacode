import { CheckCircledIcon } from '@radix-ui/react-icons'

type FormSuccessProps = {
  message?: string
}

export function FormSuccess({ message }: Readonly<FormSuccessProps>) {
  return (
    <>
      {message && (
        <div className="bg-emerald-100 p-3 rounded-md flex items-center space-x-2 text-sm text-emerald-500">
          <CheckCircledIcon className={'h-4 w-4'} />
          <p>{message}</p>
        </div>
      )}
    </>
  )
}