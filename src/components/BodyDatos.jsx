import { UserCircleIcon } from '@heroicons/react/20/solid'

export default function BodyDatos ({ nombre, apellidoP, apellidoM }) {
  return (
    <div className='mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6'>
      <dt className='flex-none'>
        <span className='sr-only'>Datos Préstamo</span>
        <UserCircleIcon className='h-7 w-7 text-pink-700' aria-hidden='true' />
      </dt>
      <dd className='text-xl font-medium leading-6 text-gray-900'>{nombre} {apellidoP} {apellidoM}</dd>
    </div>
  )
}
