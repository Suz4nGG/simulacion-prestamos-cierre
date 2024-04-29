import { CheckIcon, XMarkIcon, CurrencyDollarIcon, BanknotesIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/20/solid'
import useLocalStorageData from './hooks/useLocalStorage'
import HeaderCard from './components/HeaderCard'
import { useLocation, useParams } from 'wouter'
import BodyDatos from './components/BodyDatos'
import ItemsCard from './components/ItemsCard'
import { removeLocalStorage } from './helpers'
import Button from './components/Button'
import './index.css'
import { aceptarSimulacion, noAceptarSimulacion } from './services/simulacion.service'
import { useState } from 'react'
import Loader from './components/Loader'
import DialogModal from './components/Dialog'
import Layout from './components/Layout'

const datosPrestamo = [
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
    value: 0
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
  // const [responderSimulacion, setResponderSimulacion] = useState()
  const [loader, setLoader] = useState(false)
  const [responseResponderCantidades, setResponseResponderCantidades] = useState({})
  const [open, setOpen] = useState(false)

    const simulacion = datosPrestamo.map(datoPrestamo => ({
    ...datoPrestamo,
    value: simulacionStorage[datoPrestamo?.name] || datoPrestamo?.value
  }));

  const handleResponderCantidades = async (e) => {
    setLoader(true)
    try {
      const  { statusCode, success, message } = await aceptarSimulacion({
        respuestaSimulacion: e.target.innerText === 'Aceptar' && true || e.target.innerText === 'Cancelar' && false,
        numAfiliacion: derechohabienteStorage?.numAfiliacion,
        tipoDerechohabiente: derechohabienteStorage?.tipoDerechohabiente
      })
      setResponseResponderCantidades({ statusCode, success, message})
      if (success) {
        setOpen(true)
        setTimeout(() => {
          setLocation('/')
        }, 2000)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoader(false)
      removeLocalStorage({key: 'simulacionObtenida'})
    }
  }

  const handleReintentar = () => {
    setOpen(false)
  }

  return (
    <Layout>
      <div className='lg:col-start-3 lg:row-end-1'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <DialogModal
            title={responseResponderCantidades?.message}
            subTitle={'Serás redirigido al inicio'}
            open={open} setOpen={setOpen}
            handleCancelar={!responseResponderCantidades?.success && handleReintentar}
            titleCancelar={!responseResponderCantidades?.success && 'Reitentar'}
          />
          <Loader
            titleModal='Enviando respuesta...' open={loader} setOpen ={setLoader}
          />
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
                    value={datoPrestamo?.value} />
                ))
              }
            </dl>
            <div className='w-full flex items-center'>
              <div className='px-6 py-8 w-2/4'>
                <Button
                  title='Aceptar'
                  Icon={CheckIcon}
                  styles='hover:shadow-green-500/40 shadow-green-500/20 bg-green-600'
                  handleButton={handleResponderCantidades}
                />
              </div>
              <div className='px-6 py-8 w-2/4'>
                <Button
                  title='No Aceptar'
                  Icon={XMarkIcon}
                  styles='hover:shadow-red-500/40 shadow-red-500/20 bg-red-600'
                  handleButton={handleResponderCantidades}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
