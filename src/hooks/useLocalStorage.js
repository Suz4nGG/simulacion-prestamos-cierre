import { useState, useEffect } from 'react'
import { getLocalStorage } from '../helpers'

const useLocalStorageData = () => {
  const [derechohabienteStorage, setDerechohabienteStorage] = useState({})
  const [simulacionStorage, setSimulacionStorage] = useState({})

  useEffect(() => {
    const { derechohabiente, simulacion } = getLocalStorage({ key: 'simulacionObtenida' })
    setDerechohabienteStorage(derechohabiente)
    setSimulacionStorage(simulacion)
  }, [])

  return { derechohabienteStorage, simulacionStorage }
}

export default useLocalStorageData
