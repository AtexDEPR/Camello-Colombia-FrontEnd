/**
 * Test de conectividad con el backend
 */

// Función para probar la conectividad
export const testBackendConnection = async () => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8081'
  
  console.log('🔍 Probando conexión con:', baseURL)
  
  try {
    // Probar endpoint básico sin autenticación
    const response = await fetch(`${baseURL}/api/public/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    if (response.ok) {
      console.log('✅ Backend conectado correctamente')
      return true
    } else {
      console.log('❌ Backend respondió con error:', response.status)
      return false
    }
  } catch (error) {
    console.log('❌ Error de conexión:', error)
    
    // Probar diferentes puertos comunes
    const commonPorts = [8080, 8081, 3000, 5000]
    
    for (const port of commonPorts) {
      try {
        const testUrl = `http://localhost:${port}/api/public/categories`
        console.log(`🔍 Probando puerto ${port}...`)
        
        const testResponse = await fetch(testUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        
        if (testResponse.ok) {
          console.log(`✅ Backend encontrado en puerto ${port}`)
          console.log(`💡 Actualiza VITE_API_URL=http://localhost:${port}`)
          return false
        }
      } catch (portError) {
        console.log(`❌ Puerto ${port} no disponible`)
      }
    }
    
    return false
  }
}

// Ejecutar test automáticamente en desarrollo
if (import.meta.env.VITE_DEBUG_MODE === 'true') {
  testBackendConnection()
}