import { regexComasCantidades } from "../helpers"

export default function HeaderCard ({ title, tipoAfiliacion, numAfiliacion, importePrestamo, tipoPrestamo }) {
  return (
    <>
      <div className='flex-auto pl-6 pt-6'>
        <dt className='text-xl font-semibold leading-6 text-gray-800 text-left'>{title}</dt>
        <div className='text-left mt-1 text-xl font-semibold leading-6 text-gray-800'>Importe del Préstamo  {'  '}
          <dd className='inline-flex items-center rounded-md bg-orange-100 px-2 py-0 text-xl font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20 mr-1'>
            $ {regexComasCantidades(importePrestamo?.toFixed(2) || '')}
          </dd>
        </div>
      </div>
      <div className='flex-none self-end px-6 pt-4'>
        <dt className='sr-only'>Tipo Afiliación</dt>
        <dd className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xl font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mr-1'>
          {tipoAfiliacion}
        </dd>
        <dd
          className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xl font-medium text-green-700 ring-1 ring-inset ring-green-600/20'>
          {numAfiliacion}
        </dd>
      </div>
      <div className='flex-none self-end px-6 pt-4'>
        <dt className='sr-only'>Tipo Préstamo</dt>
        <dd className='inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xl font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20 mr-1'>
          Tipo Préstamo: {tipoPrestamo === 0 ? 'Corto Plazo' : 'Mediano Plazo'}
        </dd>
        <dt className='sr-only'>Tipo Préstamo</dt>
        <dd className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xl font-medium text-red-700 ring-1 ring-inset ring-red-600/20 mr-1'>
          Descuento: {tipoAfiliacion === 'A' ? 'Quincenal' : 'Mensual'}
        </dd>
      </div>
    </>
  )
}
