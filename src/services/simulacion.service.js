import { ObtenerSimulacion, ResponderSimulacion } from "../endpoints"
const ERROR_SERVER = { success: false, message: 'Error de conexión con el servidor' }

export const obtenerSimulacion = async ({ idTablet }) => {
  console.log(idTablet)
  console.log(`${ObtenerSimulacion}${idTablet}`)
  try {
    const response = await fetch(`${ObtenerSimulacion}${idTablet}`, {
      method: 'GET', headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    const { data, statusCode, success, message } = await response.json()
    return { data, statusCode, success, message }
  } catch (err) {
    return ERROR_SERVER
  }
}

export const aceptarSimulacion = async ({ respuestaSimulacion, numAfiliacion, tipoDerechohabiente }) => {
  console.log(tipoDerechohabiente)
  try {
    const response = await fetch(ResponderSimulacion, {
      method: 'PUT',
      body: JSON.stringify({ respuestaSimulacion, numAfiliacion, tipoDerechohabiente }),
      headers: { 'Content-Type': 'application/json' }
    })
    const { statusCode, success, message } = await response.json()
    console.log(statusCode, success, message)
    return { statusCode, success, message }

  } catch (err) {
    return ERROR_SERVER
  }
}