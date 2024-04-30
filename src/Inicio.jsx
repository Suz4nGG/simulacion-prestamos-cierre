import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import Button from './components/Button'
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'wouter'
import { useEffect, useState } from 'react'
import Loader from './components/Loader';
import { obtenerSimulacion } from './services/simulacion.service'
import { getLocalStorage, setLocalStorage } from './helpers';
import Layout from './components/Layout'


export default function Inicio () {
  const [idTablet, setIdTablet] = useState('')
  const [loader, setLoader] = useState(false)
  const [, setLocation] = useLocation();
  const [response, setResponse] = useState({message: '', success: true})

  useEffect(() => {
    const storageIdTablet = getLocalStorage({key: 'idTablet'})
    if (storageIdTablet === null || storageIdTablet === "")  {
      setIdTablet(uuidv4())
      setLocalStorage({key: 'idTablet', storage: idTablet})
    } else {
      console.log('El ID ya se a agregado', idTablet)
      setIdTablet(storageIdTablet)
    }
  }, [idTablet])

  const handleSimulacion = async () => {
    setLoader(true)
    try {
      const {data, statusCode, success, message} = await obtenerSimulacion({idTablet})
      setResponse({message, success})
      console.log(statusCode)
      if (statusCode === 200 && success) {
        const {derechohabiente, simulacion} = data
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
    <Layout>
      <div className='mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
            Bienvenido al Simulador de Préstamos
          </h1>
          <p className='mt-6 text-xl leading-8 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum saepe eveniet qui, in mollitia adipisci consequatur esse aut quasi dolores.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Button title={!response?.success ?'Intente consultar nuevamente' : 'Consultar'} Icon={CurrencyDollarIcon} handleButton={handleSimulacion} />
          </div>
        </div>
      </div>
      <p className='pt-10 text-white font-bold'>{idTablet}</p>
      <Loader
        titleModal='Obteniendo simulación...' open={loader} setOpen ={setLoader}
      />
    </Layout>
  )
}
