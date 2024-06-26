import { CreditCardIcon } from '@heroicons/react/20/solid'
import { regexComasCantidades } from '../helpers'

export default function ItemsCard ({ title, value, Icon = CreditCardIcon }) {
  const isTitle = 'Importe Total a Pagar' === title || 'Intereses Nuevo Préstamo' === title
  const isPlazo = 'Plazo (Meses)' === title

  return (
    <div className={`mt-2 py-2 flex w-full flex-none gap-x-4 px-6 ${isTitle ? 'justify-end' : 'even:bg-gray-100'}`}>
      <dt className='flex-none'>
        <span className='sr-only'>{title}</span>
        <Icon className={`h-7 w-7 ${isTitle ? 'text-green-700' : 'text-blue-900'}`} aria-hidden='true' />
      </dt>
      <dd className={`${ isTitle ? 'text-right text-green-800 font-semibold' : 'text-left w-full'} text-xl leading-6 text-gray-500 truncate`}>
        {title}
      </dd>
      <dd className={`${isTitle ? 'text-green-700 font-extrabold' : 'text-gray-500 w-full text-right font-semibold'} text-xl leading-6 text-gray-500`}> {isPlazo ? value : `$ ${regexComasCantidades(value?.toFixed(2))}`}</dd>
    </div>
  )
}
