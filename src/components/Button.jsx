import { CreditCardIcon } from '@heroicons/react/20/solid'

export default function Button ({ title, Icon = CreditCardIcon, handleButton, styles = 'hover:shadow-pink-500/40 shadow-pink-500/20 bg-pink-800' }) {
  return (
    <button
      onClick={handleButton}
      className={`rounded-lg text-white hover:shadow-lg shadow-md w-full flex justify-center items-center mt-4 border-t border-gray-900/5 px-4 py-2.5 active:opacity-[0.85] active:shadow-none ${styles}`}
    >
      {title}
      <Icon className='pl-2 h-8 w-8 text-gray-100' aria-hidden='true' />
    </button>
  )
}
