import { respuestaSimulacion } from "../mocks/respuesta-simulacion.mocks"

export const obtenerSimulacion = async ({ idTablet }) => {
  try {
    const data = await respuestaSimulacion
    return { data, statusCode: 200, success: true, message: 'Simulacion obtenida' }

  } catch (err) {
    return {
      success: false, message: 'Error de conexión con el servidor'
    }
  }

}