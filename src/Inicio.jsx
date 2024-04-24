import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Button from './components/Button'
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'wouter'
import { useEffect, useState } from 'react'
import Loader from './components/Loader';
import { obtenerSimulacion } from './services/obtener-simulacion.service'
import { getLocalStorage, setLocalStorage } from './helpers';


export default function Inicio () {
  const [idTablet, setIdTablet] = useState('')
  const [loader, setLoader] = useState(false)
  const [, setLocation] = useLocation();
  const [response, setResponse] = useState({message: '', success: true})
  // const [paramsSimulacion, setParamsSimulacion] = useState([])

  useEffect(() => {
    const storageIdTablet = getLocalStorage({key: 'idTablet'})
    if (storageIdTablet === null )  {
      setIdTablet(uuidv4())
      setLocalStorage({key: 'idTablet', storage: idTablet})
    } else {
      console.log('El ID ya se a agregado', idTablet)
      setIdTablet(storageIdTablet)
    }


  }, [])

  const handleSimulacion = async () => {
    console.log('handle')
    setLoader(true)
    try {
      const {data, statusCode, success, message} = await obtenerSimulacion({idTablet})
      setResponse({message, success})
      if (statusCode === 200 && success) {
        const {derechohabiente, simulacion} = data[0]
        setLocalStorage({
          key: 'simulacionObtenida',
          storage: {
            derechohabiente,
            simulacion
          }
        })
        setLocation(`/simulador/${idTablet}`)
      }
    } catch (e) {
      setResponse({message: 'Ocurrio un error, intentelo nuevamente', success: false})
      console.error(e)
    } finally {
      setLoader(false)
    }
  }

  return (
    <div className='bg-white'>
      <div className='relative isolate px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='hidden sm:mb-8 sm:flex sm:justify-center'>
            <div className='relative rounded-full px-6 py-4 text-sm leading-6 text-gray-600 ring-2 ring-pink-900/10 hover:ring-pink-900/20'>
              Encuesta de satisfacción.{' '}
              <a href='#' className='font-semibold text-pink-800'>
                <span className='absolute inset-0' aria-hidden='true' />
                Contestar <span aria-hidden='true'>&rarr;</span>
              </a>
            </div>
          </div>
          <div className='text-center'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              Bienvenido al Simulador de Préstamos
            </h1>
            <p className='mt-6 text-md leading-8 text-gray-600'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe eveniet qui, in mollitia adipisci consequatur esse aut quasi dolores.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button title='Consultar' Icon={CurrencyDollarIcon} handleButton={handleSimulacion} />
            </div>
            {
              !response?.success && <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Button title='Consultar' Icon={CurrencyDollarIcon} handleButton={handleSimulacion} />
            </div>
            }
          </div>
        </div>
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
      </div>
      <Loader
        titleModal='Obteniendo simulación...' open={loader} setOpen ={setLoader}
      />
    </div>
  )
}
