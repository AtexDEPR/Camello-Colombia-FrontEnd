import type { 
  User, Category, Service, JobOffer, Conversation, Message, Review, Notification, DashboardStats, PagedResponse 
} from '@/types/api'
// Demo state eliminado; usar configuración estática

function range(n: number) { return Array.from({ length: n }, (_, i) => i) }

const now = new Date()
function monthsBack(m: number) {
  const d = new Date(now)
  d.setMonth(d.getMonth() - m)
  return d
}

// Mock users by role
export const mockUsers: Record<string, User> = {
  FREELANCER: {
    id: 'f-001', email: 'freelancer@camello.co', role: 'FREELANCER', isActive: true, isVerified: true,
    createdAt: monthsBack(3).toISOString(), updatedAt: now.toISOString(), deletedAt: null,
  } as any,
  CONTRACTOR: {
    id: 'c-001', email: 'empresa@camello.co', role: 'CONTRACTOR', isActive: true, isVerified: false,
    createdAt: monthsBack(3).toISOString(), updatedAt: now.toISOString(), deletedAt: null,
  } as any,
  ADMIN: {
    id: 'a-001', email: 'admin@camello.co', role: 'ADMIN', isActive: true, isVerified: true,
    createdAt: monthsBack(3).toISOString(), updatedAt: now.toISOString(), deletedAt: null,
  } as any,
}

export const categories: Category[] = [
  { id: 'cat-design', name: 'Diseño', description: 'UI/UX, branding, ilustración', active: true },
  { id: 'cat-dev', name: 'Desarrollo', description: 'Web, móvil, backend', active: true },
  { id: 'cat-marketing', name: 'Marketing', description: 'Social, SEO, contenido', active: true },
  { id: 'cat-video', name: 'Video', description: 'Edición, animación', active: true },
]

// Servicios detallados y no genéricos para la lista de Explore
export const services: Service[] = [
  {
    id: 'srv-1',
    freelancerId: 'f-001',
    freelancerName: 'Laura Méndez',
    freelancerProfilePicture: '/freelancer-para-srv-1.png',
    categoryId: 'cat-design',
    categoryName: 'Diseño',
    title: 'Diseño de Logo e Identidad Visual',
    description: 'Creación de logo único, paleta de colores, tipografía y guía de uso para fortalecer tu marca.',
    price: 450000,
    deliveryTime: '5-7 días',
    revisionsIncluded: 3,
    images: ['/cover-para-srv-1.png'],
    tags: ['Branding', 'Logo', 'Manual de marca'],
    isActive: true,
    isFeatured: true,
    viewsCount: 1200,
    ordersCount: 80,
    rating: 4.8,
    imageUrl: '/cover-para-srv-1.png',
    location: 'Bogotá',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-2',
    freelancerId: 'f-001',
    freelancerName: 'Laura Méndez',
    freelancerProfilePicture: '/freelancer-para-srv-2.png',
    categoryId: 'cat-design',
    categoryName: 'Diseño',
    title: 'UI/UX para Aplicaciones Web',
    description: 'Diseño de interfaces intuitivas con flujos claros, prototipos en Figma y handoff a desarrollo.',
    price: 650000,
    deliveryTime: '10-15 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-2.png'],
    tags: ['UI/UX', 'Figma', 'Prototipo'],
    isActive: true,
    isFeatured: false,
    viewsCount: 860,
    ordersCount: 34,
    rating: 4.7,
    imageUrl: '/cover-para-srv-2.png',
    location: 'Medellín',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-3',
    freelancerId: 'f-001',
    freelancerName: 'Carlos Rodríguez',
    freelancerProfilePicture: '/freelancer-para-srv-3.png',
    categoryId: 'cat-dev',
    categoryName: 'Desarrollo',
    title: 'Landing Page enfocada en conversión',
    description: 'Desarrollo de landing page responsive optimizada para SEO y velocidad, lista para campañas.',
    price: 480000,
    deliveryTime: '3-5 días',
    revisionsIncluded: 3,
    images: ['/cover-para-srv-3.png'],
    tags: ['React', 'Responsive', 'SEO'],
    isActive: true,
    isFeatured: true,
    viewsCount: 1420,
    ordersCount: 52,
    rating: 4.9,
    imageUrl: '/cover-para-srv-3.png',
    location: 'Bogotá',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-4',
    freelancerId: 'f-001',
    freelancerName: 'Carlos Rodríguez',
    freelancerProfilePicture: '/freelancer-para-srv-4.png',
    categoryId: 'cat-dev',
    categoryName: 'Desarrollo',
    title: 'E-commerce con Shopify o WooCommerce',
    description: 'Tienda online completa con pagos, inventario, SEO y optimización de performance.',
    price: 1250000,
    deliveryTime: '12-18 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-4.png'],
    tags: ['Shopify', 'WooCommerce', 'E-commerce'],
    isActive: true,
    isFeatured: false,
    viewsCount: 640,
    ordersCount: 19,
    rating: 4.6,
    imageUrl: '/cover-para-srv-4.png',
    location: 'Cali',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-5',
    freelancerId: 'f-001',
    freelancerName: 'María Gómez',
    freelancerProfilePicture: '/freelancer-para-srv-5.png',
    categoryId: 'cat-marketing',
    categoryName: 'Marketing',
    title: 'SEO Técnico y On-Page',
    description: 'Auditoría técnica, optimización de contenidos y estructura para mejorar posicionamiento orgánico.',
    price: 520000,
    deliveryTime: '7-10 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-5.png'],
    tags: ['SEO', 'Auditoría', 'On-Page'],
    isActive: true,
    isFeatured: true,
    viewsCount: 970,
    ordersCount: 41,
    rating: 4.8,
    imageUrl: '/cover-para-srv-5.png',
    location: 'Barranquilla',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-6',
    freelancerId: 'f-001',
    freelancerName: 'María Gómez',
    freelancerProfilePicture: '/freelancer-para-srv-6.png',
    categoryId: 'cat-marketing',
    categoryName: 'Marketing',
    title: 'Campañas Meta/Google Ads',
    description: 'Planificación, setup y optimización de campañas con enfoque en ROI.',
    price: 600000,
    deliveryTime: '14-21 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-6.png'],
    tags: ['Ads', 'Meta', 'Google'],
    isActive: true,
    isFeatured: false,
    viewsCount: 520,
    ordersCount: 22,
    rating: 4.5,
    imageUrl: '/cover-para-srv-6.png',
    location: 'Medellín',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-7',
    freelancerId: 'f-001',
    freelancerName: 'Julián Pérez',
    freelancerProfilePicture: '/freelancer-para-srv-7.png',
    categoryId: 'cat-video',
    categoryName: 'Video',
    title: 'Edición de video profesional',
    description: 'Edición con ritmo, color, subtítulos y gráficos animados para redes o corporativo.',
    price: 400000,
    deliveryTime: '5-7 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-7.png'],
    tags: ['Edición', 'Color', 'Motion'],
    isActive: true,
    isFeatured: false,
    viewsCount: 780,
    ordersCount: 28,
    rating: 4.7,
    imageUrl: '/cover-para-srv-7.png',
    location: 'Bogotá',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-8',
    freelancerId: 'f-001',
    freelancerName: 'Julián Pérez',
    freelancerProfilePicture: '/freelancer-para-srv-8.png',
    categoryId: 'cat-video',
    categoryName: 'Video',
    title: 'Animación 2D explicativa',
    description: 'Video animado explicativo (60-90s) con storyboard, locución y música.',
    price: 950000,
    deliveryTime: '12-16 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-8.png'],
    tags: ['Animación', 'Storyboard', 'Locución'],
    isActive: true,
    isFeatured: true,
    viewsCount: 640,
    ordersCount: 18,
    rating: 4.6,
    imageUrl: '/cover-para-srv-8.png',
    location: 'Cali',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-9',
    freelancerId: 'f-001',
    freelancerName: 'Ana López',
    freelancerProfilePicture: '/freelancer-para-srv-9.png',
    categoryId: 'cat-marketing',
    categoryName: 'Marketing',
    title: 'Copywriting para Landing Pages',
    description: 'Mensajes persuasivos, estructura AIDA y pruebas A/B para mejorar conversiones.',
    price: 380000,
    deliveryTime: '4-6 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-9.png'],
    tags: ['Copywriting', 'A/B Testing', 'Conversion'],
    isActive: true,
    isFeatured: false,
    viewsCount: 500,
    ordersCount: 20,
    rating: 4.7,
    imageUrl: '/cover-para-srv-9.png',
    location: 'Cartagena',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
  {
    id: 'srv-10',
    freelancerId: 'f-001',
    freelancerName: 'Carlos Rodríguez',
    freelancerProfilePicture: '/freelancer-para-srv-10.png',
    categoryId: 'cat-dev',
    categoryName: 'Desarrollo',
    title: 'Optimización de Performance Web',
    description: 'Mejora de velocidad (LCP, CLS, TBT), caching, imágenes y bundle split.',
    price: 420000,
    deliveryTime: '3-5 días',
    revisionsIncluded: 2,
    images: ['/cover-para-srv-10.png'],
    tags: ['Performance', 'Core Web Vitals', 'Caching'],
    isActive: true,
    isFeatured: false,
    viewsCount: 610,
    ordersCount: 24,
    rating: 4.8,
    imageUrl: '/cover-para-srv-10.png',
    location: 'Bucaramanga',
    createdAt: monthsBack(2).toISOString(),
    updatedAt: now.toISOString(),
  } as any,
] as any

// Información ampliada por servicio para la página de detalle
export interface DetailedServiceInfo {
  id: string
  title: string
  description: string
  benefits: string[]
  processSteps: string[]
  requirements?: string[]
  deliveryTime: string
  caseStudies?: { title: string; result: string }[]
  testimonials?: { client: string; quote: string }[]
  tags?: string[]
  images?: string[]
  freelancer?: {
    id: string
    name: string
    avatar: string
    location: string
    rating: number
    totalReviews: number
    memberSince: string
    responseTime: string
    verified: boolean
  }
}

export const serviceDetails: Record<string, DetailedServiceInfo> = {
  'srv-3': {
    id: 'srv-3',
    title: 'Landing Page enfocada en conversión',
    description: 'Diseño y desarrollo de una landing page optimizada para velocidad, SEO y conversión. Incluye copy básico, integración con formularios y analítica.',
    benefits: [
      'Mayor tasa de conversión (estructura AIDA y CTAs claros)',
      'Carga rápida y buen puntaje en Core Web Vitals',
      'Diseño responsive y coherente con tu marca',
      'Listo para campañas (Meta/Google Ads)'
    ],
    processSteps: [
      'Brief y objetivos de negocio',
      'Wireframe y propuesta visual',
      'Implementación responsive (React/Next o HTML/CSS)',
      'Optimización SEO y performance',
      'Pruebas y ajustes finales',
      'Publicación y soporte post-entrega (7 días)'
    ],
    requirements: [
      'Logo y paleta de colores (si existe)',
      'Texto base y oferta de valor',
      'Referencias de diseño que te gusten',
      'Acceso a hosting o CMS (si aplica)'
    ],
    deliveryTime: '3-5 días',
    caseStudies: [
      { title: 'Fintech B2C', result: 'Incremento del 32% en leads en 30 días' },
      { title: 'Educación online', result: 'Reducción del tiempo de carga de 4.2s a 1.1s' }
    ],
    testimonials: [
      { client: 'María G.', quote: 'Profesional y rápido. La landing quedó perfecta para nuestras campañas.' },
      { client: 'Juan R.', quote: 'Excelente comunicación y resultados visibles desde la primera semana.' }
    ],
    tags: ['React', 'Responsive', 'SEO'],
    images: ['/galería-1-para-srv-3.png', '/galería-2-para-srv-3.png'],
    freelancer: {
      id: 'f1',
      name: 'Carlos Rodríguez',
      avatar: '/freelancer-para-srv-3.png',
      location: 'Bogotá',
      rating: 4.8,
      totalReviews: 42,
      memberSince: 'Enero 2023',
      responseTime: '2 horas',
      verified: true
    }
  },
  'srv-1': {
    id: 'srv-1',
    title: 'Diseño de Logo e Identidad Visual',
    description: 'Construyo una identidad sólida con logo, tipografía y paleta de colores, lista para crecer tu marca.',
    benefits: [
      'Marca coherente y memorable',
      'Guía de uso que facilita la implementación',
      'Entrega lista para impresión y digital'
    ],
    processSteps: [
      'Brief y moodboard',
      'Exploración de conceptos',
      'Propuesta y refinamiento',
      'Manual de marca y archivos finales'
    ],
    requirements: ['Nombre de marca', 'Referencias visuales', 'Valores y tono deseado'],
    deliveryTime: '5-7 días',
    caseStudies: [{ title: 'Retail local', result: 'Aumento de recordación de marca en encuestas (+27%)' }],
    testimonials: [{ client: 'Andrea P.', quote: 'La identidad quedó espectacular y muy usable.' }],
    tags: ['Branding', 'Logo', 'Manual de marca'],
    images: ['/galería-1-para-srv-1.png', '/galería-2-para-srv-1.png'],
    freelancer: {
      id: 'f1',
      name: 'Laura Méndez',
      avatar: '/freelancer-para-srv-1.png',
      location: 'Bogotá',
      rating: 4.8,
      totalReviews: 60,
      memberSince: 'Marzo 2022',
      responseTime: '3 horas',
      verified: true
    }
  }
  ,
  'srv-2': {
    id: 'srv-2',
    title: 'UI/UX para Aplicaciones Web',
    description: 'Diseño y prototipado centrado en el usuario para aplicaciones web y dashboards con tests rápidos.',
    benefits: [
      'Mayor adopción y satisfacción del usuario',
      'Flujos claros y consistencia visual',
      'Handoff ordenado para desarrollo',
    ],
    processSteps: [
      'Kickoff y objetivos',
      'Wireframes y arquitectura',
      'Prototipo en Figma (alta fidelidad)',
      'Tests y ajustes',
      'Entrega de assets y guía de estilos',
    ],
    requirements: ['Descripción funcional', 'Perfiles de usuario', 'Referencias visuales'],
    deliveryTime: '10-15 días',
    caseStudies: [
      { title: 'Dashboard SaaS', result: 'Redujo abandono en onboarding en 38%' },
    ],
    testimonials: [
      { client: 'Laura M.', quote: 'Estructuró el flujo y nos ayudó con decisiones de diseño.' },
    ],
    tags: ['UI/UX', 'Figma', 'Design System'],
    images: ['/galería-1-para-srv-2.png', '/cover-para-srv-2.png'],
    freelancer: {
      id: 'f-002',
      name: 'Carlos Gómez',
      avatar: '/freelancer-para-srv-2.png',
      location: 'Medellín',
      rating: 4.8,
      totalReviews: 142,
      memberSince: '2020',
      responseTime: '1 hora',
      verified: true,
    }
  },
  'srv-4': {
    id: 'srv-4',
    title: 'E-commerce con Shopify o WooCommerce',
    description: 'Implementación de tienda con pagos, inventario y tema optimizado para conversión.',
    benefits: [
      'Checkout optimizado',
      'Gestión de inventario y envíos integrada',
      'Tema rápido y responsive con SEO base',
    ],
    processSteps: [
      'Definición de catálogo y arquitectura',
      'Configuración de plataforma y tema',
      'Integración de pagos y envíos',
      'Carga de productos y pruebas',
      'Optimización y go-live',
    ],
    requirements: ['Lista de productos', 'Políticas de tienda', 'Acceso a dominio'],
    deliveryTime: '12-18 días',
    caseStudies: [
      { title: 'Retail moda', result: 'Incremento del 26% en conversión' },
    ],
    testimonials: [
      { client: 'Miguel R.', quote: 'Entrega clara y soporte para operar el día a día.' },
    ],
    tags: ['Shopify', 'WooCommerce', 'Conversión'],
    images: ['/galería-1-para-srv-4.png', '/galería-2-para-srv-4.png'],
    freelancer: {
      id: 'f-004',
      name: 'Ana Torres',
      avatar: '/freelancer-para-srv-4.png',
      location: 'Bogotá',
      rating: 4.9,
      totalReviews: 211,
      memberSince: '2019',
      responseTime: '3 horas',
      verified: true,
    }
  },
  'srv-5': {
    id: 'srv-5',
    title: 'SEO Técnico y On-Page',
    description: 'Auditoría técnica, optimización on-page y estructura semántica para mejorar posicionamiento.',
    benefits: [
      'Mejor indexación y velocidad de rastreo',
      'Contenido optimizado para keywords',
      'Enlaces internos y estructura limpia',
    ],
    processSteps: [
      'Auditoría técnica y crawl',
      'Plan de correcciones',
      'Optimización de metadatos y contenido',
      'Enlazado interno',
      'Medición con Search Console',
    ],
    requirements: ['Acceso a CMS', 'Prioridades de negocio', 'Keywords objetivo'],
    deliveryTime: '7-12 días',
    caseStudies: [
      { title: 'Blog B2B', result: 'Tráfico orgánico +52% en 3 meses' },
    ],
    testimonials: [
      { client: 'Julián S.', quote: 'Diagnóstico certero y mejoras con impacto medible.' },
    ],
    tags: ['SEO', 'On-Page', 'Técnico'],
    images: ['/galería-1-para-srv-5.png', '/galería-2-para-srv-5.png'],
    freelancer: {
      id: 'f-005',
      name: 'Diego Rivera',
      avatar: '/freelancer-para-srv-5.png',
      location: 'Barranquilla',
      rating: 4.7,
      totalReviews: 123,
      memberSince: '2018',
      responseTime: '4 horas',
      verified: true,
    }
  },
  'srv-6': {
    id: 'srv-6',
    title: 'Campañas Meta/Google Ads',
    description: 'Configuración y optimización continua de campañas con medición basada en objetivos.',
    benefits: [
      'Estructura orientada a KPIs',
      'Creatividades y copys testeados A/B',
      'Reportes claros y recomendaciones',
    ],
    processSteps: [
      'Brief y KPIs',
      'Estructura de cuenta y tracking',
      'Configuración campañas y creatividades',
      'Optimización y pruebas A/B',
      'Reporte y mejora continua',
    ],
    requirements: ['Acceso a cuentas', 'Pixel/Tag Manager', 'Definición de audiencias'],
    deliveryTime: '5-10 días',
    caseStudies: [
      { title: 'Lead gen B2B', result: 'CPL -33% y leads calificados +20%' },
    ],
    testimonials: [
      { client: 'Valentina P.', quote: 'Foco en resultados y aprendizaje continuo.' },
    ],
    tags: ['Meta Ads', 'Google Ads', 'A/B Testing'],
    images: ['/galería-1-para-srv-6.png', '/galería-2-para-srv-6.png'],
    freelancer: {
      id: 'f-006',
      name: 'Pedro Salazar',
      avatar: '/freelancer-para-srv-6.png',
      location: 'Cali',
      rating: 4.8,
      totalReviews: 176,
      memberSince: '2021',
      responseTime: '2 horas',
      verified: true,
    }
  },
  'srv-7': {
    id: 'srv-7',
    title: 'Edición de video profesional',
    description: 'Edición, colorización y motion básico para piezas de marketing y social media.',
    benefits: [
      'Narrativa y ritmo adecuados',
      'Color y audio balanceados',
      'Versiones para múltiples plataformas',
    ],
    processSteps: [
      'Recepción de material y brief',
      'Selección y armado de corte',
      'Colorización y audio',
      'Motion y gráficos',
      'Correcciones y exportación',
    ],
    requirements: ['Footage en alta', 'Lineamientos de marca', 'Guion si aplica'],
    deliveryTime: '4-7 días',
    caseStudies: [
      { title: 'Campaña retail', result: '3.2x en alcance orgánico' },
    ],
    testimonials: [
      { client: 'Sofía T.', quote: 'Piezas listas para publicar sin dolores de cabeza.' },
    ],
    tags: ['Edición', 'Color', 'Motion'],
    images: ['/galería-1-para-srv-7.png', '/galería-2-para-srv-7.png'],
    freelancer: {
      id: 'f-007',
      name: 'Andrés Pérez',
      avatar: '/freelancer-para-srv-7.png',
      location: 'Bogotá',
      rating: 4.6,
      totalReviews: 98,
      memberSince: '2017',
      responseTime: '6 horas',
      verified: true,
    }
  },
  'srv-8': {
    id: 'srv-8',
    title: 'Animación 2D explicativa',
    description: 'Animación 2D para explicar productos o procesos, con guion y locución opcional.',
    benefits: [
      'Explicaciones claras y memorables',
      'Estilo alineado a la marca',
      'Versiones con y sin locución',
    ],
    processSteps: [
      'Brief y objetivos',
      'Guion y storyboard',
      'Diseño de escenas',
      'Animación y sonido',
      'Correcciones y entrega',
    ],
    requirements: ['Objetivos y audiencia', 'Lineamientos de marca', 'Referencias'],
    deliveryTime: '8-14 días',
    caseStudies: [
      { title: 'Explainer app salud', result: 'Conversión +22% en página de producto' },
    ],
    testimonials: [
      { client: 'Natalia V.', quote: 'Proceso claro y resultado profesional.' },
    ],
    tags: ['Animación', 'Explainer', 'Storyboard'],
    images: ['/galería-1-para-srv-8.png', '/galería-2-para-srv-8.png'],
    freelancer: {
      id: 'f-008',
      name: 'María León',
      avatar: '/freelancer-para-srv-8.png',
      location: 'Manizales',
      rating: 4.8,
      totalReviews: 154,
      memberSince: '2020',
      responseTime: '3 horas',
      verified: true,
    }
  },
  'srv-9': {
    id: 'srv-9',
    title: 'Copywriting para Landing Pages',
    description: 'Redacción persuasiva con estructura AIDA y pruebas rápidas de titulares y CTAs.',
    benefits: [
      'Mensajes que conectan con la audiencia',
      'Estructura optimizada para escaneo',
      'Pruebas de titulares y CTAs',
    ],
    processSteps: [
      'Brief y tono de marca',
      'Research y voz del cliente',
      'Redacción y estructura',
      'Iteraciones y pruebas',
      'Entrega editable',
    ],
    requirements: ['Propuesta de valor', 'Audiencia objetivo', 'Beneficios clave'],
    deliveryTime: '3-5 días',
    caseStudies: [
      { title: 'Landing SaaS', result: 'CTR +19% con nuevo titular' },
    ],
    testimonials: [
      { client: 'Ricardo F.', quote: 'Expresó el valor de forma concreta y convincente.' },
    ],
    tags: ['Copywriting', 'AIDA', 'CTAs'],
    images: ['/galería-1-para-srv-9.png', '/galería-2-para-srv-9.png'],
    freelancer: {
      id: 'f-009',
      name: 'Paula Mejía',
      avatar: '/freelancer-para-srv-9.png',
      location: 'Bogotá',
      rating: 4.9,
      totalReviews: 201,
      memberSince: '2016',
      responseTime: '2 horas',
      verified: true,
    }
  },
  'srv-10': {
    id: 'srv-10',
    title: 'Optimización de Performance Web',
    description: 'Optimización de Core Web Vitals, carga diferida y reducción de peso para mejorar velocidad y SEO.',
    benefits: [
      'Mejor LCP, CLS y TBT',
      'Menor rebote por carga percibida rápida',
      'Base técnica sólida para SEO',
    ],
    processSteps: [
      'Auditoría (Lighthouse/WebPageTest)',
      'Plan de optimización',
      'Implementación de mejoras',
      'Medición post cambios',
      'Handover técnico',
    ],
    requirements: ['Acceso a repo/CMS', 'Páginas críticas', 'Tracking actual'],
    deliveryTime: '5-8 días',
    caseStudies: [
      { title: 'Medio digital', result: 'LCP -40% y CLS ~0 en homepage' },
    ],
    testimonials: [
      { client: 'Esteban Q.', quote: 'Trabajo limpio y métricas comparables.' },
    ],
    tags: ['Performance', 'Core Web Vitals', 'Optimización'],
    images: ['/galería-1-para-srv-10.png', '/galería-2-para-srv-10.png'],
    freelancer: {
      id: 'f-010',
      name: 'Luisa Prado',
      avatar: '/freelancer-para-srv-10.png',
      location: 'Medellín',
      rating: 4.8,
      totalReviews: 132,
      memberSince: '2018',
      responseTime: '3 horas',
      verified: true,
    }
  }
}

export const jobOffers: JobOffer[] = range(6).map(i => ({
  id: `job-${i+1}`,
  title: `Oferta: Proyecto ${i+1}`,
  description: `Buscamos talento para proyecto ${i+1}.`,
  budget: 250000 + i * 50000,
  location: ['Bogotá', 'Medellín', 'Cali'][i % 3],
  createdAt: monthsBack(1).toISOString(),
  updatedAt: now.toISOString(),
  status: i % 2 === 0 ? 'OPEN' : 'CLOSED',
})) as any

export const conversations: Conversation[] = range(3).map(i => ({
  id: `conv-${i+1}`,
  participants: [mockUsers.FREELANCER, mockUsers.CONTRACTOR],
  lastMessageAt: now.toISOString(),
})) as any

export const messages: Message[] = range(12).map(i => ({
  id: `msg-${i+1}`,
  conversationId: `conv-${(i % 3) + 1}`,
  senderId: i % 2 === 0 ? 'f-001' : 'c-001',
  content: `Mensaje de prueba #${i+1}`,
  createdAt: new Date(now.getTime() - i * 3600_000).toISOString(),
})) as any

export const reviews: Review[] = range(5).map(i => ({
  id: `rev-${i+1}`,
  serviceId: `srv-${i+1}`,
  rating: 4 + (i % 2),
  comment: `Excelente trabajo #${i+1}`,
  createdAt: monthsBack(2).toISOString(),
})) as any

export const notifications: Notification[] = range(6).map(i => ({
  id: `ntf-${i+1}`,
  type: i % 2 === 0 ? 'MESSAGE' : 'JOB_UPDATE',
  content: `Notificación #${i+1}`,
  createdAt: new Date(now.getTime() - i * 86_400_000).toISOString(),
  read: i % 3 === 0,
})) as any

const MONTH_SPAN = 3
export const dashboardStats: DashboardStats = {
  totalEarnings: 3200000,
  totalJobs: jobOffers.length,
  totalServices: services.length,
  ratingsAverage: 4.6,
  recentActivity: range(MONTH_SPAN).map(m => ({
    month: monthsBack(m).toLocaleString('es-CO', { month: 'short' }),
    earnings: 900000 - m * 150000,
    jobs: 5 - m,
    services: 10 - m,
  })),
}

// Actividad reciente con estructura compatible con el dashboard
export const recentActivities = [
  {
    id: '1',
    type: 'message',
    title: 'Nuevo mensaje recibido',
    description: 'Tienes un nuevo mensaje de un cliente potencial',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    clientName: 'María González'
  },
  {
    id: '2',
    type: 'order',
    title: 'Nueva orden recibida',
    description: 'Has recibido una nueva orden para diseño de logo',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    clientName: 'Carlos Méndez',
    amount: 250000
  },
  {
    id: '3',
    type: 'review',
    title: 'Nueva reseña recibida',
    description: 'Has recibido una reseña de 5 estrellas',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    clientName: 'Ana López'
  }
]

export function paginate<T>(items: T[], page = 0, size = 10): PagedResponse<T> {
  const start = page * size
  const end = start + size
  const content = items.slice(start, end)
  const totalElements = items.length
  const totalPages = Math.ceil(totalElements / size)
  return {
    content,
    totalElements,
    totalPages,
    size,
    number: page,
    first: page === 0,
    last: page + 1 === totalPages,
  }
}