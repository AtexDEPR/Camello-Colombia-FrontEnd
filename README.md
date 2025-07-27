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

### Para Contratantes
- 🏢 Perfil de empresa o persona natural
- 📢 Publicar ofertas de trabajo
- 🔎 Buscar freelancers por categoría, ubicación y precio
- 👥 Revisar postulaciones y contratar directamente
- ⭐ Calificar servicios recibidos
- 📈 Gestionar proyectos activos

### Características Técnicas
- 🎨 **3 Temas**: Claro, Oscuro y Noche
- 📱 **Responsive Design**: Funciona perfectamente en móviles y desktop
- ⚡ **Animaciones Fluidas**: Experiencia de usuario moderna con Framer Motion
- 🔐 **Seguridad**: Autenticación JWT y rutas protegidas
- 🌐 **PWA Ready**: Preparado para funcionar como aplicación web progresiva

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

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **shadcn/ui** - Componentes de UI reutilizables

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/camello-frontend.git
cd camello-frontend
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita el archivo \`.env.local\` con tus configuraciones:
\`\`\`env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Camello
VITE_APP_VERSION=1.0.0
\`\`\`

4. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

5. **Abrir en el navegador**
Visita \`http://localhost:5173\`

## 🏗️ Estructura del Proyecto

\`\`\`
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
│   ├── Dashboard.tsx  # Dashboard principal
│   ├── Explore.tsx    # Explorar servicios
│   ├── Jobs.tsx       # Ofertas de trabajo
│   ├── Messages.tsx   # Mensajes
│   └── AdminPanel.tsx # Panel administrativo
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
├── assets/             # Imágenes y recursos estáticos
└── App.tsx            # Componente principal
\`\`\`

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

\`\`\`bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo
npm run build        # Construye para producción
npm run preview      # Vista previa de la build
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica tipos de TypeScript
\`\`\`

## 📱 Páginas y Funcionalidades

### 🏠 Landing Page (\`/\`)
- Hero section con animaciones
- Características principales
- Categorías de servicios
- Call-to-action para registro

### 🔐 Autenticación
- **Login** (\`/login\`): Inicio de sesión
- **Registro** (\`/register\`): Crear cuenta como freelancer o contratante

### 📊 Dashboard (\`/dashboard\`)
- Vista personalizada según tipo de usuario
- Estadísticas y métricas importantes
- Acceso rápido a funciones principales

### 🔍 Explorar (\`/explore\`)
- Búsqueda de freelancers y servicios
- Filtros avanzados
- Vista de perfiles públicos

### 💼 Trabajos (\`/jobs\`)
- Ofertas de trabajo disponibles
- Aplicar a proyectos
- Gestión de postulaciones

### 💬 Mensajes (\`/messages\`)
- Chat entre usuarios
- Historial de conversaciones
- Notificaciones en tiempo real

## 🎯 Roadmap de Desarrollo

### ✅ Fase 1 - MVP (Actual)
- [x] Sistema de autenticación
- [x] Perfiles de usuario
- [x] Landing page responsive
- [x] Sistema de temas
- [x] Navegación básica

### 🔄 Fase 2 - En Desarrollo
- [ ] Sistema de servicios completo
- [ ] Búsqueda y filtros avanzados
- [ ] Sistema de mensajería
- [ ] Calificaciones y reviews

### 🔮 Fase 3 - Futuro
- [ ] Integración de pagos (Wompi/PayU)
- [ ] Notificaciones push
- [ ] App móvil nativa
- [ ] Sistema de contratos

## 🤝 Contribuir al Proyecto

¡Nos encanta recibir contribuciones! Aquí te explicamos cómo puedes ayudar:

### 1. Fork del Repositorio
\`\`\`bash
git fork https://github.com/tu-usuario/camello-frontend.git
\`\`\`

### 2. Crear una Rama
\`\`\`bash
git checkout -b feature/nueva-funcionalidad
\`\`\`

### 3. Realizar Cambios
- Sigue las convenciones de código existentes
- Agrega comentarios en español
- Asegúrate de que el código sea responsive

### 4. Commit y Push
\`\`\`bash
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad
\`\`\`

### 5. Crear Pull Request
Describe claramente los cambios realizados y su propósito.

## 📋 Convenciones de Código

### Nomenclatura
- **Componentes**: PascalCase (\`UserProfile.tsx\`)
- **Archivos**: kebab-case (\`user-profile.tsx\`)
- **Variables**: camelCase (\`userName\`)
- **Constantes**: UPPER_SNAKE_CASE (\`API_BASE_URL\`)

### Estructura de Componentes
\`\`\`typescript
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
\`\`\`

## 🐛 Reportar Problemas

Si encuentras un bug o tienes una sugerencia:

1. Revisa si ya existe un issue similar
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Capturas de pantalla si es necesario
   - Información del navegador/dispositivo

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo \`LICENSE\` para más detalles.

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
\`\`\`
