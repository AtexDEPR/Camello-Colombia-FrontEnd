# 🐫 Camello - Plataforma Freelance Colombiana

![Camello Logo](./src/assets/hero-illustration.jpg)

## 📋 Descripción del Proyecto

**Camello** es una plataforma digital 100% colombiana diseñada para conectar freelancers locales con empresas, pymes y personas que necesitan servicios digitales, creativos o tecnológicos. Nuestro objetivo es democratizar el acceso a oportunidades freelance en Colombia, creando una comunidad de crecimiento conjunto.

### 🎯 ¿Por qué Camello?

- **🇨🇴 Enfoque Local**: Diseñado específicamente para el mercado colombiano
- **💰 Pagos en Pesos**: Sin complicaciones de conversión de moneda
- **🗣️ Soporte en Español**: Atención y plataforma completamente en español
- **🤝 Confianza Local**: Sistema de calificaciones y verificación adaptado a nuestra cultura
- **📱 Mobile First**: Optimizado para que freelancers trabajen desde cualquier dispositivo

## 🚀 Características Principales

### Para Freelancers
- ✅ Crear perfil profesional completo
- 📝 Publicar servicios con precios en pesos colombianos
- 🔍 Buscar y aplicar a ofertas de trabajo
- ⭐ Sistema de calificaciones y reputación
- 💬 Chat directo con clientes
- 📊 Dashboard con estadísticas de rendimiento
- 📋 Gestión de contratos activos
- 🔔 Sistema de notificaciones en tiempo real
- 💳 Gestión de métodos de pago
- ⚙️ Configuración avanzada de cuenta

### Para Contratantes
- 🏢 Perfil de empresa o persona natural
- 📢 Publicar ofertas de trabajo
- 🔎 Buscar freelancers por categoría, ubicación y precio
- 👥 Revisar postulaciones y contratar directamente
- ⭐ Calificar servicios recibidos
- 📈 Gestionar proyectos activos
- 📋 Seguimiento de contratos
- 💬 Comunicación directa con freelancers
- 🔔 Notificaciones de estado de proyectos

### Características Técnicas
- 🎨 **3 Temas**: Claro, Oscuro y Noche
- 📱 **Responsive Design**: Funciona perfectamente en móviles y desktop
- ⚡ **Animaciones Fluidas**: Experiencia de usuario moderna con Framer Motion
- 🔐 **Seguridad**: Autenticación JWT y rutas protegidas
- 🌐 **PWA Ready**: Preparado para funcionar como aplicación web progresiva
- 🔄 **Estado Global**: Gestión avanzada con React Query
- 📝 **Formularios Inteligentes**: Validación y manejo de errores

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18+** - Biblioteca principal de UI
- **TypeScript** - Tipado estático para mayor seguridad
- **Vite** - Herramienta de construcción rápida
- **React Router DOM v6** - Navegación entre páginas
- **Tailwind CSS** - Framework de estilos utilitarios
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Iconografía moderna
- **React Query** - Gestión de estado del servidor
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **shadcn/ui** - Componentes de UI reutilizables

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **TypeScript** - Verificación de tipos

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/camello-frontend.git
cd camello-frontend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita el archivo `.env.local` con tus configuraciones:
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Camello
VITE_APP_VERSION=1.0.0
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

5. **Abrir en el navegador**
Visita `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/             # Componentes base de shadcn/ui
│   ├── Layout/         # Componentes de layout (Header, Footer)
│   ├── Hero/           # Sección hero de la landing
│   ├── Features/       # Sección de características
│   ├── Categories/     # Categorías de servicios
│   ├── CTA/           # Call-to-action sections
│   ├── Dashboard/     # Componentes del dashboard
│   ├── Messages/      # Sistema de mensajería
│   ├── Profile/       # Perfiles de usuario
│   ├── Reviews/       # Sistema de calificaciones
│   ├── Search/        # Búsqueda avanzada
│   └── Services/      # Gestión de servicios
├── pages/              # Páginas principales
│   ├── Index.tsx      # Landing page
│   ├── Login.tsx      # Página de login
│   ├── Register.tsx   # Página de registro
│   ├── ForgotPassword.tsx # Recuperación de contraseña
│   ├── Dashboard.tsx  # Dashboard principal
│   ├── Explore.tsx    # Explorar servicios
│   ├── Jobs.tsx       # Ofertas de trabajo
│   ├── CreateJob.tsx  # Crear oferta de trabajo
│   ├── JobDetail.tsx  # Detalle de trabajo
│   ├── ServiceDetail.tsx # Detalle de servicio
│   ├── Contracts.tsx  # Gestión de contratos
│   ├── Messages.tsx   # Mensajes
│   ├── Notifications.tsx # Notificaciones
│   ├── Settings.tsx   # Configuración de cuenta
│   ├── EditProfile.tsx # Editar perfil
│   ├── PaymentMethods.tsx # Métodos de pago
│   ├── AdminPanel.tsx # Panel administrativo
│   └── NotFound.tsx   # Página 404
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── assets/             # Imágenes y recursos estáticos
└── App.tsx            # Componente principal
```

## 🎨 Sistema de Temas

Camello incluye tres temas personalizados:

### 🌞 Tema Claro (Predeterminado)
- Color primario: Camello claro (#D9A74F)
- Fondo: Beige claro (#FFF8EF)
- Texto: Gris oscuro (#2B2B2B)

### 🌙 Tema Oscuro
- Fondo: Gris oscuro (#1F1F1F)
- Texto: Blanco (#F5F5F5)
- Acentos: Naranja cálido

### 🌑 Tema Noche
- Fondo: Negro puro (#000000)
- Texto: Blanco puro (#FFFFFF)
- Máximo contraste para uso nocturno

## 🚀 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
```

## 📱 Páginas y Funcionalidades

### 🏠 Landing Page (`/`)
- Hero section con animaciones
- Características principales
- Categorías de servicios
- Call-to-action para registro

### 🔐 Autenticación
- **Login** (`/login`): Inicio de sesión
- **Registro** (`/register`): Crear cuenta como freelancer o contratante
- **Recuperar Contraseña** (`/forgot-password`): Recuperación de contraseña

### 📊 Dashboard (`/dashboard`)
- Vista personalizada según tipo de usuario
- Estadísticas y métricas importantes
- Acceso rápido a funciones principales

### 🔍 Explorar (`/explore`)
- Búsqueda de freelancers y servicios
- Filtros avanzados
- Vista de perfiles públicos

### 💼 Gestión de Trabajos
- **Trabajos** (`/jobs`): Ofertas de trabajo disponibles
- **Crear Trabajo** (`/jobs/create`): Publicar nueva oferta
- **Detalle de Trabajo** (`/jobs/:id`): Información completa del trabajo
- **Detalle de Servicio** (`/services/:id`): Información del servicio

### 📋 Gestión de Contratos (`/contracts`)
- Vista de contratos activos
- Estado de proyectos
- Historial de trabajos completados
- Gestión de pagos

### 💬 Comunicación
- **Mensajes** (`/messages`): Chat entre usuarios
- **Notificaciones** (`/notifications`): Sistema de alertas en tiempo real

### 👤 Perfil y Configuración
- **Configuración** (`/settings`): Ajustes de cuenta
- **Editar Perfil** (`/profile/edit`): Modificar información personal
- **Métodos de Pago** (`/payment-methods`): Gestión de formas de pago

### 🔧 Administración
- **Panel Admin** (`/admin`): Gestión administrativa de la plataforma

## 🎯 Roadmap de Desarrollo

### ✅ Fase 1 - MVP (Completado)
- [x] Sistema de autenticación completo con JWT
- [x] Context de autenticación y rutas protegidas
- [x] Integración con API del backend
- [x] Perfiles de usuario avanzados
- [x] Landing page responsive
- [x] Sistema de temas (Claro, Oscuro, Noche)
- [x] Navegación completa con roles
- [x] Dashboard dinámico por tipo de usuario
- [x] Gestión de servicios con React Query
- [x] Componentes UI completos con shadcn/ui
- [x] Sistema de notificaciones con toast
- [x] Manejo de errores y loading states

### 🔄 Fase 2 - En Desarrollo
- [x] Integración completa con backend
- [x] Sistema de autenticación JWT
- [x] Gestión de servicios y perfiles
- [ ] Sistema de pagos (Wompi/PayU)
- [ ] Chat en tiempo real
- [ ] Calificaciones y reviews avanzadas
- [ ] Búsqueda y filtros inteligentes

### 🔮 Fase 3 - Futuro
- [ ] Notificaciones push
- [ ] App móvil nativa
- [ ] Sistema de contratos legales
- [ ] Integración con redes sociales
- [ ] Marketplace de servicios

## 🤝 Contribuir al Proyecto

¡Nos encanta recibir contribuciones! Aquí te explicamos cómo puedes ayudar:

### 1. Fork del Repositorio
```bash
git fork https://github.com/tu-usuario/camello-frontend.git
```

### 2. Crear una Rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### 3. Realizar Cambios
- Sigue las convenciones de código existentes
- Agrega comentarios en español
- Asegúrate de que el código sea responsive

### 4. Commit y Push
```bash
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
```

### 5. Crear Pull Request
Describe claramente los cambios realizados y su propósito.

## 📋 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Archivos**: kebab-case (`user-profile.tsx`)
- **Variables**: camelCase (`userName`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Estructura de Componentes
```typescript
// Imports externos
import React from 'react';
import { Button } from '@/components/ui/button';

// Imports internos
import { useAuth } from '@/hooks/use-auth';

// Tipos e interfaces
interface ComponentProps {
  title: string;
  isActive?: boolean;
}

// Componente principal
export function Component({ title, isActive = false }: ComponentProps) {
  // Hooks
  const { user } = useAuth();
  
  // Estados locales
  const [loading, setLoading] = useState(false);
  
  // Funciones
  const handleClick = () => {
    // Lógica del componente
  };
  
  // Render
  return (
    <div className="component-container">
      {/* JSX */}
    </div>
  );
}
```

## 🐛 Reportar Problemas

Si encuentras un bug o tienes una sugerencia:

1. Revisa si ya existe un issue similar
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Capturas de pantalla si es necesario
   - Información del navegador/dispositivo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo de Desarrollo

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Spring Boot + PostgreSQL (repositorio separado)
- **Diseño**: Figma + Sistema de diseño personalizado

## 📞 Contacto y Soporte

- **Email**: soporte@camello.co
- **Website**: https://camello.co
- **GitHub**: https://github.com/camello-platform

---

**¡Hecho con ❤️ en Colombia para freelancers colombianos!**

*Camello - Conectando talento local con oportunidades reales*
