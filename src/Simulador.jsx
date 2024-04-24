import { CheckIcon, XMarkIcon, CurrencyDollarIcon, BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/20/solid'
import useLocalStorageData from './hooks/useLocalStorage'
import HeaderCard from './components/HeaderCard'
import { useLocation, useParams } from 'wouter'
import BodyDatos from './components/BodyDatos'
import ItemsCard from './components/ItemsCard'
import { regexComasCantidades, removeLocalStorage } from './helpers'
import Button from './components/Button'
import './index.css'

const datosPrestamo = [
  {
    label: 'Intereses Préstamo Anterior',
    name: 'interesesPrestamoAnterior',
    icon: CurrencyDollarIcon,
    value: 0,
  },
  {
    label: 'Saldo Préstamo Anterior',
    name: 'saldoPrestamoAnterior',
    icon: CurrencyDollarIcon,
    value: 0,
  },
  {
    label: 'Fondo Garantía',
    name: 'fondoGarantia',
    icon: CurrencyDollarIcon,
    value: 0,
  },
    {
    label: 'Prima Renovación',
    name: 'primaRenovacion',
    icon: CurrencyDollarIcon,
    value: 0,
  },
    {
    label: 'Importe Cheque',
    name: 'importeCheque',
    icon: CurrencyDollarIcon,
    value: 0,
  },
  {
    label: 'Descuento',
    name: 'descuento',
    icon: ArrowTrendingDownIcon,
    value: 0
  },
  {
    label: 'Plazo',
    name: 'plazo',
    icon: ArrowTrendingDownIcon,
    value: '12'
  },
  {
    label: 'Intereses Nuevo Préstamo',
    name: 'interesesNuevoPrestamo',
    icon: ArrowTrendingUpIcon,
    value: 0
  },
  {
    label: 'Importe Total a Pagar',
    name: 'total',
    icon: BanknotesIcon,
    value: 0
  },
]

export default function Simulador () {
  const { derechohabienteStorage, simulacionStorage } = useLocalStorageData();
  const [, setLocation] = useLocation();

  // * IDTablet
  const params = useParams()

    const simulacion = datosPrestamo.map(datoPrestamo => ({
    ...datoPrestamo,
    value: simulacionStorage[datoPrestamo?.name] || datoPrestamo?.value
  }));

  const handleAceptarCantidades = () => {
    console.log('Aceptar', params?.idTablet)
  }

  const handleRechazarCantidades = () => {
    setLocation('/')
    removeLocalStorage({key: 'simulacionObtenida'})
  }

  return (
    <div className='lg:col-start-3 lg:row-end-1'>
      <h2 className='sr-only'>Cálculo de Préstamo</h2>
      <div className='rounded-lg bg-zinc-50 shadow-sm ring-1 ring-gray-900/5'>
        <dl className='flex flex-wrap'>
          <HeaderCard
            title='Cálculo de Préstamo'
            tipoAfiliacion={derechohabienteStorage?.tipoDerechohabiente}
            numAfiliacion={derechohabienteStorage?.numAfiliacion}
            importePrestamo={simulacionStorage?.importePrestamo}
          />
          <BodyDatos
            nombre={derechohabienteStorage?.nombre}
            apellidoP={derechohabienteStorage?.paterno}
            apellidoM={derechohabienteStorage?.materno}
          />
          {
            simulacion?.map(datoPrestamo => (
              <ItemsCard
                key={datoPrestamo?.name} 
                title={datoPrestamo?.label} 
                Icon={datoPrestamo?.icon} 
                value={regexComasCantidades(datoPrestamo?.value || '')} />
            ))
          }
        </dl>
        <div className='w-full flex items-center'>
          <div className='px-6 py-8 w-2/4'>
            <Button
              title='Aceptar Cantidades'
              Icon={CheckIcon}
              styles='hover:shadow-green-500/40 shadow-green-500/20 bg-green-600'
              handleButton={handleAceptarCantidades}
            />
          </div>
          <div className='px-6 py-8 w-2/4'>
            <Button
              title='No Aceptar'
              Icon={XMarkIcon}
              styles='hover:shadow-red-500/40 shadow-red-500/20 bg-red-600'
              handleButton={handleRechazarCantidades}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
