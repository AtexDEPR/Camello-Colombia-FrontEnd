# 🚀 Guía de Desarrollo - Camello Frontend

## 📋 Estado Actual del Proyecto

### ✅ Completado (90%)

#### **🔐 Autenticación y Seguridad**
- ✅ Context de autenticación con JWT
- ✅ Rutas protegidas por roles
- ✅ Login y registro funcionales
- ✅ Manejo de tokens y refresh
- ✅ Logout seguro

#### **🌐 Integración con Backend**
- ✅ Cliente Axios configurado
- ✅ Interceptores para autenticación
- ✅ Manejo de errores HTTP
- ✅ Servicios de API organizados
- ✅ Tipos TypeScript sincronizados

#### **📊 Gestión de Estado**
- ✅ React Query configurado
- ✅ Hooks personalizados para servicios
- ✅ Cache y sincronización automática
- ✅ Loading y error states

#### **🎨 UI/UX**
- ✅ Sistema de diseño completo
- ✅ 3 temas (Claro, Oscuro, Noche)
- ✅ Componentes shadcn/ui
- ✅ Animaciones con Framer Motion
- ✅ Responsive design
- ✅ Iconografía con Lucide React

#### **🧭 Navegación**
- ✅ React Router v6 configurado
- ✅ Rutas protegidas implementadas
- ✅ Header dinámico por rol
- ✅ Navegación contextual

### 🔄 En Desarrollo (10%)

#### **📱 Funcionalidades Pendientes**
- [ ] Página de creación de servicios
- [ ] Sistema de búsqueda avanzada
- [ ] Chat en tiempo real
- [ ] Gestión de contratos
- [ ] Sistema de pagos
- [ ] Notificaciones push

## 🛠️ Configuración de Desarrollo

### **Prerrequisitos**
```bash
Node.js 18+
npm o yarn
Backend de Camello ejecutándose en puerto 8080
```

### **Instalación**
```bash
# Clonar repositorio
git clone [repo-url]
cd Camello-Colombia-FrontEnd

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar desarrollo
npm run dev
```

### **Variables de Entorno**
```env
VITE_API_URL=http://localhost:8080/api
VITE_DEBUG_MODE=true
VITE_ENABLE_NOTIFICATIONS=true
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base (shadcn/ui)
│   ├── Layout/         # Header, Footer, etc.
│   ├── Dashboard/      # Dashboards por rol
│   └── [Feature]/      # Componentes por funcionalidad
├── contexts/           # Contexts de React
│   └── AuthContext.tsx # Autenticación global
├── hooks/              # Hooks personalizados
│   ├── useServices.ts  # Gestión de servicios
│   └── use-toast.ts    # Sistema de notificaciones
├── lib/                # Utilidades y configuración
│   ├── api.ts          # Cliente Axios
│   └── utils.ts        # Funciones helper
├── pages/              # Páginas principales
├── services/           # Servicios de API
├── types/              # Tipos TypeScript
└── App.tsx             # Componente principal
```

## 🔧 Herramientas de Desarrollo

### **Scripts Disponibles**
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting con ESLint
npm run lint:fix     # Fix automático de lint
npm run type-check   # Verificación de tipos
```

### **Extensiones Recomendadas (VSCode)**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag
- Prettier - Code formatter

## 🎯 Próximos Pasos

### **Prioridad Alta**
1. **Crear página de servicios**
   - Formulario de creación
   - Lista de servicios propios
   - Edición y eliminación

2. **Implementar búsqueda**
   - Filtros avanzados
   - Paginación
   - Ordenamiento

3. **Mejorar dashboard**
   - Estadísticas reales
   - Gráficos con Recharts
   - Actividad reciente

### **Prioridad Media**
4. **Sistema de mensajería**
   - Chat básico
   - Lista de conversaciones
   - Notificaciones

5. **Gestión de contratos**
   - Estados de proyecto
   - Historial
   - Calificaciones

### **Prioridad Baja**
6. **Funcionalidades avanzadas**
   - Pagos con Wompi
   - Notificaciones push
   - PWA features

## 🐛 Debugging

### **Logs de Desarrollo**
El sistema incluye logging automático cuando `VITE_DEBUG_MODE=true`:
- Requests y responses de API
- Cambios de estado de autenticación
- Errores de red y validación

### **Herramientas de Debug**
- React Developer Tools
- Redux DevTools (si se usa)
- Network tab para API calls
- Console logs estructurados

## 📄 Detalle de Servicios (Explorar / ServiceDetail)

- Fuente de datos:
  - `src/mocks/data.ts` define dos estructuras:
    - `services`: lista resumida usada en tarjetas y listados.
    - `serviceDetails`: contenido ampliado por `id` para la página de detalle.
- Renderizado:
  - `src/pages/ServiceDetail.tsx` construye un ViewModel combinando `serviceDetails[id]` con el resumen de `services`.
  - Si no existe `serviceDetails[id]`, usa el resumen y muestra mensajes de placeholder en secciones detalladas.
- Validaciones:
  - Se loguea `console.warn` cuando falta detalle para un `id`.
  - Se evita cualquier fallback a otro servicio (antes: `srv-3`), previniendo contenidos incorrectos.
- Cómo añadir un nuevo detalle:
  1) Agrega el servicio en `services` con `id`, `title`, `description`, `tags`, `price`, etc.
  2) Crea la entrada correspondiente en `serviceDetails[id]` con `benefits`, `processSteps`, `requirements`, `caseStudies`, `testimonials` y `freelancer`.
  3) Verifica en `ServiceDetail` que se rendericen las secciones sin warnings.
- Pruebas:
  - Abre `/service/:id` para cada servicio (2–10) y confirma que título, descripción y secciones coinciden.
  - Usa el filtro por categoría en `Explore` para navegar a cada detalle.

## 📝 Convenciones de Código

### **Nomenclatura**
- Componentes: `PascalCase`
- Archivos: `kebab-case.tsx`
- Variables: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`

### **Estructura de Componentes**
```typescript
// Imports externos
import React from 'react'

// Imports internos
import { useAuth } from '@/contexts/AuthContext'

// Tipos
interface Props {
  title: string
}

// Componente
export function Component({ title }: Props) {
  // Hooks
  // Estados
  // Funciones
  // Render
}
```

### **Manejo de Errores**
```typescript
try {
  await apiCall()
  toast({ title: "Éxito", description: "Operación completada" })
} catch (error: any) {
  toast({
    title: "Error",
    description: error.response?.data?.message || "Error inesperado",
    variant: "destructive"
  })
}
```

## 🚀 Despliegue

### **Build de Producción**
```bash
npm run build
```

### **Variables de Producción**
```env
VITE_API_URL=https://api.camello.co
VITE_DEBUG_MODE=false
VITE_ENABLE_NOTIFICATIONS=true
```

### **Plataformas Recomendadas**
- **Vercel**: Ideal para React/Vite
- **Netlify**: Alternativa sólida
- **Railway**: Si necesitas más control

## 📞 Soporte

Para dudas o problemas:
1. Revisar esta documentación
2. Verificar logs en consola
3. Comprobar estado del backend
4. Revisar variables de entorno

---

**Estado del proyecto**: ✅ **Listo para desarrollo activo**
**Última actualización**: Diciembre 2024