# Requerimientos Camello

## 📌 Contexto General de la Plataforma “Camello”

---

### 🌍 **Nombre del proyecto:**

**Camello** – Plataforma digital freelance colombiana

---

### 🧭 **Contexto y origen del proyecto:**

En Colombia, miles de jóvenes, estudiantes, creativos, desarrolladores y profesionales independientes ofrecen servicios digitales. Sin embargo, muchos de ellos enfrentan una dura realidad: las principales plataformas de trabajo freelance como Fiverr, Upwork o Freelancer están en inglés, no priorizan a los usuarios latinoamericanos, tienen procesos complejos de cobro, y además **cobran comisiones elevadas sin brindar una verdadera conexión local**.

A esto se suma la dificultad de los pequeños negocios colombianos para contratar servicios digitales de manera confiable. Muchos no saben dónde buscar talento, tienen desconfianza o no tienen experiencia trabajando con freelancers. Esto crea una **desconexión** entre dos sectores que se necesitan mutuamente.

Camello nace como una solución a este problema estructural, buscando **democratizar el acceso a oportunidades freelance en Colombia**, conectar talentos con necesidades reales de forma **local, sencilla, confiable y segura**, y crear una comunidad de crecimiento conjunto.

---

### 🎯 **Propósito de Camello:**

Camello es una plataforma digital que tiene como objetivo **conectar a freelancers colombianos con empresas, pymes y personas** que requieren servicios digitales, creativos o tecnológicos. Ofrece un espacio donde pueden encontrarse, colaborar, generar ingresos y construir reputación profesional.

---

### 💡 **¿Por qué ahora?**

- El trabajo remoto y freelance está en auge tras la pandemia.
- Muchas pymes colombianas buscan digitalizarse pero no tienen cómo encontrar talento confiable.
- Aumenta el número de jóvenes con habilidades digitales que no encuentran empleo formal.
- Existe una fuerte necesidad de **plataformas locales**, accesibles y en español, que se adapten al contexto nacional.

---

### 🎯 **Usuarios objetivo:**

### Freelancers:

- Jóvenes entre 18 y 35 años
- Con habilidades en diseño, desarrollo, redes sociales, contenido, etc.
- Que no tienen acceso a clientes por medios tradicionales
- Buscan trabajar por su cuenta con confianza y pagos en pesos colombianos

### Contratantes:

- PYMES, emprendimientos, personas naturales
- Negocios que no tienen un equipo interno de diseño, tech o marketing
- Personas que quieren hacer un logo, una tienda online, o contratar servicios por proyecto

---

### 🇨🇴 **Enfoque nacional**

Camello no quiere ser un “clon de Fiverr”. Busca adaptarse a la **realidad colombiana**:

- Pagos en pesos (futuro con Wompi/PayU)
- Soporte local
- Categorías ajustadas al mercado local (ej. redes sociales para emprendimientos)
- Confianza entre usuarios con calificaciones reales y moderación local
- Estilo visual cálido, con identidad cercana y sencilla

---

### 🔮 **Proyección futura**

Camello será un ecosistema. Luego de validar el MVP se planea:

- Integrar pagos en la plataforma
- Ofrecer planes premium con mayor visibilidad
- Agregar contratos y facturación automática
- Expandirse a LATAM, empezando por países cercanos como Ecuador y Perú

---

### ✅ **Conclusión**

Camello no solo es una plataforma tecnológica, es una **apuesta por la economía digital en Colombia**, por empoderar el talento local y por conectar oportunidades reales con quienes están listos para trabajar desde su casa, su ciudad o su celular. Con enfoque local, valores humanos y diseño centrado en las personas, Camello busca ser una herramienta de cambio real.

---

## 🧩Requerimientos Funcionales y Técnicos para Camello (MVP)

---

### 📌 NOMBRE DEL PROYECTO:

**Camello** – Plataforma digital freelance 100% colombiana, orientada a conectar freelancers con contratantes locales (personas, pymes, empresas).

---

## I. 🎯 OBJETIVO PRINCIPAL

Desarrollar una plataforma web que permita a freelancers ofrecer servicios profesionales y a contratantes publicar necesidades u ofertas freelance. La solución debe ser intuitiva, segura, funcional y enfocada al mercado colombiano.

---

## II. 🧠 FUNCIONALIDADES CLAVE (CASOS DE USO)

### 👥 Usuarios

- Registro como **Freelancer** o **Contratante**
- Inicio de sesión con **correo y contraseña**
- Recuperación de contraseña
- Edición de perfil
- Eliminación y desactivación de cuenta (soft delete)

---

### 🔐 Seguridad

- Autenticación con **JWT (JSON Web Tokens)**
- Protección de rutas por roles
- Middleware de validación en frontend y backend
- Encriptación de contraseñas (BCrypt)

---

### 🧑‍💻 Freelancers

- Crear y editar perfil profesional con:
    - Nombre, foto, categoría, descripción, ubicación
    - Servicios ofrecidos: nombre, precio, descripción, tiempo de entrega
    - Portafolio de trabajos (URLs o imágenes)
- Ver y aplicar a ofertas publicadas por contratantes
- Recibir solicitudes directas de contratación
- Calificar al cliente post-servicio
- Ver historial de servicios ofrecidos

---

### 🏢 Contratantes

- Crear perfil de empresa o persona
- Publicar ofertas freelance con:
    - Título, descripción, categoría, presupuesto, plazo
- Buscar freelancers por:
    - Categoría, reputación, ciudad, rango de precios
- Contratar directamente desde el perfil de un freelancer
- Recibir postulaciones a sus ofertas
- Aceptar/rechazar postulaciones
- Calificar al freelancer

---

### 🧩 Funcionalidades comunes

- Feed público de servicios ofrecidos por freelancers
- Feed de ofertas disponibles para freelancers
- Sistema de búsqueda con filtros avanzados
- Chat interno (asíncrono inicialmente)
- Notificaciones por correo y en plataforma
- Sección de ayuda y contacto

---

## III. 🛠️ PANELES ADMINISTRATIVOS

### 🔧 Panel del administrador (interna)

- Login administrativo con permisos especiales
- CRUD de usuarios (crear, ver, bloquear, eliminar)
- Revisión de publicaciones ofensivas o reportadas
- Estadísticas generales:
    - Total de usuarios, freelancers activos, ofertas activas, transacciones
- Gestión de mensajes de soporte

---

## IV. 💰 MONETIZACIÓN (para fases posteriores)

*No obligatorio en la beta, pero se debe dejar prevista su arquitectura:*

- Comisión por contrato realizado
- Planes premium para mayor visibilidad
- Destacar servicios u ofertas
- Integración con Wompi / PayU (pasarela de pagos colombiana)

---

## V. ⚙️ ARQUITECTURA Y TECNOLOGÍAS

### Backend (Spring Boot)

- Spring Boot 3.x
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL
- Swagger para documentación
- MapStruct o ModelMapper (para DTOs)
- Validación con Hibernate Validator
- Arquitectura por capas (Controlador, Servicio, Repositorio, Entidades)
- Manejo global de excepciones

### Frontend (React)

- React 18+
- React Router DOM v6
- Axios
- TailwindCSS o Chakra UI
- Context API (o Redux Toolkit si hay tiempo)
- Rutas protegidas por roles
- Formik + Yup para formularios
- Toasts/Alertas (ej: react-toastify)

---

## VI. 🗂️ ESTRUCTURA DEL MVP (prioridad por fases)

### 🔹 **Fase 1 – Usuarios**

- Registro, login, recuperación de contraseña
- Perfil básico
- Dashboard inicial por tipo de usuario

### 🔹 **Fase 2 – Freelancers**

- Crear y publicar servicios
- Ver solicitudes recibidas
- Aplicar a ofertas

### 🔹 **Fase 3 – Contratantes**

- Crear y publicar ofertas
- Ver candidatos y contratar
- Calificar

### 🔹 **Fase 4 – Comunes**

- Buscador público con filtros
- Feed público de servicios y ofertas
- Chat básico entre usuarios
- Sistema de calificaciones

### 🔹 **Fase 5 – Admin**

- Login admin
- Panel de control básico
- Moderación de contenido y usuarios

---

## VII. 🔍 SUGERENCIAS UX/UI (en diseño vendrá más a detalle)

- Estilo sobrio, profesional, amigable
- Tonos: blanco, azul, gris oscuro (con toques colombianos modernos)
- Responsive 100%
- Mobile-first (pensando en los freelancers desde el celular)

---

## VIII. 📈 ESCALABILIDAD Y CONSIDERACIONES

- Sistema preparado para integración con pagos
- Soporte futuro para verificación de usuarios (KYC)
- Infraestructura pensada para escalar con Docker, GitHub Actions, Railway o Render

---

## IX. DOCUMENTACIÓN

- Backend con Swagger/OpenAPI 3
- Repos separados en GitHub (frontend y backend)
- Instrucciones de despliegue (Docker, Railway, Vercel o Netlify)

---

## 🧠 PROMPT PARA FUNCIONALIDAD Y LÓGICA DEL SISTEMA – CAMELLO (Spring Boot + React)

---

### 🧭 **Objetivo técnico del sistema:**

Construir la lógica completa de una plataforma de freelancers enfocada en el mercado colombiano. El sistema debe permitir registrar usuarios (freelancers y contratantes), publicar servicios y ofertas, aplicar, contratar, calificar y comunicarse. El backend será construido con **Spring Boot** y el frontend con **React**, ambos conectados mediante una API REST segura.

---

## 🔐 AUTENTICACIÓN Y SEGURIDAD

### Backend

- **Autenticación JWT**: generación de tokens al login y validación en cada solicitud.
- **Spring Security**:
    - Roles: `ROLE_ADMIN`, `ROLE_FREELANCER`, `ROLE_CONTRACTOR`
    - Filtro de autorización por endpoints
    - Middleware de validación de token
- **Registro/Login**:
    - Registro por tipo de usuario con validación
    - Encriptación con BCrypt
    - Validación de email (opcional)

### Frontend

- Context o Redux para manejar sesión
- Persistencia del token en `localStorage`
- Rutas protegidas por roles
- Logout con invalidación de token

---

## 👤 GESTIÓN DE USUARIOS

### Requerimientos:

- Registro de **freelancers** y **contratantes** desde formularios separados
- Editar perfil con validaciones (frontend y backend)
- Visualización de perfiles públicos
- Eliminar cuenta (soft delete)
- **Verificación visual de estado**: verificado / no verificado / destacado

---

## 🧾 SERVICIOS Y OFERTAS

### Freelancers:

- Publicar servicio tipo “gig”:
    - Título, categoría, precio, descripción, entrega estimada
    - Imágenes o archivos adjuntos (URL)
- Listar todos sus servicios (CRUD)
- Ver solicitudes recibidas
- Marcar como “servicio completado”

### Contratantes:

- Publicar ofertas:
    - Título, presupuesto, plazo, descripción
    - Habilidades requeridas
- Ver postulaciones de freelancers
- Aceptar o rechazar postulaciones
- Marcar como “contrato finalizado”

---

## 🔎 BÚSQUEDA Y FILTRADO

### Para ambos roles:

- Buscador general de servicios y freelancers
- Filtros:
    - Por categoría
    - Por ciudad
    - Por precio
    - Por calificación promedio

---

## ⭐ CALIFICACIONES Y REPUTACIÓN

- Después de cada contrato:
    - Contratante califica al freelancer (1-5 estrellas + comentario)
    - Freelancer califica al contratante
- Las calificaciones afectan el ranking en la búsqueda
- Calificación promedio visible en el perfil

---

## 💬 MENSAJERÍA (versión inicial asíncrona)

- Sistema de bandeja de entrada entre usuarios
- Ver conversaciones anteriores
- Enviar mensaje nuevo
- Notificaciones por nueva conversación
- (Opcional en beta: WebSocket para chat en tiempo real)

---

## 🔔 NOTIFICACIONES

- In-app: nuevos mensajes, postulaciones, calificaciones
- Email (con Spring Mail):
    - Confirmación de registro
    - Cambios importantes
    - Mensaje recibido

---

## 📊 DASHBOARD POR ROL

### Freelancer

- Servicios creados
- Postulaciones hechas
- Contratos activos
- Calificación promedio

### Contratante

- Ofertas creadas
- Freelancers postulados
- Historial de contrataciones
- Estado de contratos

---

## 🔧 ADMINISTRADOR

- Login con credenciales especiales
- Ver lista de usuarios y servicios
- Bloquear usuarios o servicios ofensivos
- Ver estadísticas:
    - Usuarios activos
    - Servicios publicados
    - Transacciones completadas

---

## 📦 ESTRUCTURA TÉCNICA

### Backend – Spring Boot

- Arquitectura en capas:
    - `controller`, `service`, `repository`, `dto`, `entity`, `exception`, `security`
- Librerías:
    - Spring Web
    - Spring Security + JWT
    - Spring Data JPA
    - Hibernate Validator
    - Lombok
    - Swagger/OpenAPI
    - Mail Sender
- Base de datos: **PostgreSQL** (o MySQL)
- Documentación: **Swagger UI**
- Excepciones controladas (RESTExceptionHandler)

### Frontend – React

- Rutas por rol (freelancer, contratante, admin)
- Librerías:
    - React Router v6
    - Axios
    - Context API o Redux Toolkit
    - TailwindCSS
    - React Hook Form + Yup (formularios)
    - React Query (gestión de estado de APIs)
    - Framer Motion (animaciones)
    - React Toastify (notificaciones)
- Tema dinámico (claro, oscuro, noche) con almacenamiento en `localStorage`

---

## 🛠️ MÓDULOS PRINCIPALES A IMPLEMENTAR

| Módulo | Backend (Spring) | Frontend (React) |
| --- | --- | --- |
| Auth | JWT + BCrypt | Form + sesión con token |
| Users | CRUD + perfiles | Dashboard + edición |
| Services | CRUD servicios freelance | Crear / ver / buscar |
| Offers | CRUD ofertas contratantes | Aplicar / revisar postulantes |
| Contracts | Estado, historial, feedback | Ver progreso y finalizar |
| Chat | Modelo conversacional | Inbox tipo Messenger |
| Admin Panel | CRUD usuarios y stats | Panel con gráficas y moderación |

---

## 📈 ESCALABILIDAD Y CALIDAD

- Soporte para test unitarios con **JUnit + Mockito**
- Organización modular en el backend
- Frontend modularizado por páginas y componentes
- Preparado para Docker en despliegue (Dockerfile + docker-compose)

---

## 🎨 PROMPT COMPLETO DE DISEÑO UI/UX PARA “CAMELLO” – Plataforma Freelance Colombiana

---

### 🐫 **Identidad visual general**

- El estilo de Camello debe reflejar:
    - **Calidez**, **cercanía**, **conexión humana**
    - Profesionalismo moderno, sin parecer corporativo frío
    - Orgullo colombiano, autenticidad y creatividad local

---

## 🎨 PALETA DE COLORES (modo claro, oscuro y noche)

### 🟠 Modo Claro (predeterminado):

- **Color primario**: `#D9A74F` (Camello claro)
- **Color secundario**: `#E29E59` (Naranja cálido)
- **Color de fondo**: `#FFF8EF` (Beige claro)
- **Color de texto**: `#2B2B2B` (Gris oscuro neutro)
- **Color acento (botones activos, íconos):** `#CF6600`

### 🌒 Modo Oscuro:

- **Fondo principal**: `#1F1F1F`
- **Texto primario**: `#F5F5F5`
- **Color acento**: `#F5B25D`
- **Cards/fondos secundarios**: `#2B2B2B`

### 🌑 Modo Noche (extremo):

- **Fondo principal**: `#000000`
- **Texto**: `#FFFFFF`
- **Botones**: fondo `#E29E59`, texto negro o blanco según contraste
- **Hover / efectos especiales**: `#FFD79A`, `#FFB347`, `#FF934F`

---

## 🧠 EXPERIENCIA DE USUARIO (UX)

- Navegación simple y fluida
- Accesible: mínimo contraste de 4.5:1, fuentes legibles
- Tiempo de carga bajo
- Interfaz adaptable y clara para dispositivos móviles

---

## 🖌️ INTERFAZ DE USUARIO (UI)

### Componentes personalizados:

- Cards 3D para servicios y perfiles
- Avatares ilustrados o fotográficos con marcos tipo "sello colombiano"
- Botones con animaciones suaves al hover y clic
- Progress bars con microinteracciones al estilo de Duolingo
- Sistema de temas con botón de cambio (claro / oscuro / noche)

---

## ✨ ANIMACIONES Y TRANSICIONES

### Microinteracciones:

- Hover en botones: escalado suave y cambio de sombra
- Tooltips con fade y slide
- Cambios de tema con **transiciones fluidas de fondo**
- ScrollReveal de elementos al cargar

### Animaciones destacadas:

- Onboarding animado con **Framer Motion**
- Transiciones de vista (ej. entre home y dashboard)
- Ilustraciones animadas SVG en landing
- Fondo animado tipo partículas en modo noche

---

## 🧰 LIBRERÍAS Y HERRAMIENTAS

### 🖼️ **Diseño visual / estilos**

- **TailwindCSS** (configuración extendida para la paleta de colores)
- Tailwind Plugin para **Dark Mode** + sistema de themes
- **clsx** o **classnames** para manejar clases dinámicas

### 💫 **Animaciones**

- **Framer Motion** (transiciones suaves, animaciones de entrada y salida)
- **GSAP** (GreenSock) para animaciones avanzadas como ilustraciones, scroll parallax
- **LottieFiles** para ilustraciones animadas SVG (como en onboarding)
- **React Spring** (opcional para pequeños efectos de rebote o scroll)

### 🎨 **Iconografía**

- **Lucide React** (íconos modernos y personalizables)
- **Heroicons** (íconos tailwind-friendly)
- **Phosphor Icons** para versiones más detalladas de íconos

### 🔮 **Gestión de temas**

- `tailwindcss-theming` + `@tailwindcss/forms`
- Preferencias almacenadas en `localStorage`
- Cambio en tiempo real con animación (Framer Motion o simple fade)

---

## 📐 DISEÑO POR PANTALLAS / VISTAS

### 🏠 Landing Page Pública

- Hero section con ilustración animada (tipo vectorial Lottie)
- CTA claro: “Soy Freelancer” / “Soy Empresa”
- Testimonios, beneficios, cómo funciona
- Footer con diseño color camello claro

### 👤 Dashboard Freelancer

- Card con resumen de perfil
- Servicios publicados + botón “Agregar nuevo servicio”
- Lista de ofertas disponibles para aplicar
- Notificaciones animadas

### 🏢 Dashboard Contratante

- Card resumen con número de freelancers contratados
- Crear oferta
- Lista de postulantes con fichas de perfil

### ⚙️ Admin Panel

- Lista de usuarios con badges de rol
- Vista rápida de publicaciones recientes
- Moderación de reportes con semáforo de estado

---

## 🧪 INSPIRACIÓN / REFERENCIAS VISUALES

- **Dribbble**: búsqueda de “freelancer dashboard” y “warm ui”
- **Framer.com**: transiciones entre páginas
- **Trello onboarding / Duolingo interactions**: para flujo de bienvenida
- Webs de referencia:
    - [https://contra.com](https://contra.com/) (elegancia simple)
    - [https://usefyi.com](https://usefyi.com/) (claridad visual)
    - [https://andcards.com](https://andcards.com/) (branding cálido)

---

## 📦 OUTPUT ESPERADO

1. Sistema de diseño en Tailwind configurado con:
    - 3 themes: claro, oscuro y noche
    - Variables CSS integradas en `tailwind.config.js`
2. Animaciones reutilizables (`motion.div` / hooks de GSAP)
3. Componente “ThemeToggle” con íconos personalizados (🌞 🌚 🌑)
4. Página de landing animada y responsiva
5. Dashboard dinámico, con animaciones suaves y cards elegantes