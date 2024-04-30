import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'simulador-prestamos-cierre', // ! Directorio de salida relativo a la carpeta raíz del proyecto
    assetsDir: 'dist', // ! Carpeta de activos dentro de outDir
    rollupOptions: {
      input: {
        main: './index.html' // ! La página principal de la aplicación
      }
    }
  },
  base: '/simulador-prestamos-cierre/' // ! Ruta base para la aplicación en el servidor
})
