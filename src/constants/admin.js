/**
 * Constants cho Admin Page
 */

// Mock data cho projects
export const MOCK_PROJECTS = [
  {
    id: '1',
    name: 'FinTech Dashboard',
    description: 'Real-time financial analytics platform.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWLmjX82jPknhHQqpiAHOITAjBiVQZIskSA5jWdvR3svlTcQXPjRfqIwWGo9uyI6mWVjFbaGa31gX9QASyo4MHV51ys1TjMUWv7nHK4T-Jwoqf5Y7uroPKProckIffc1eadJMRBn94XWMYs9XWpdoZKQ68chv55ffO9rMP7sizZJg9-an979sDsDy5_L4dAcgy9co4slmGGSXRfTJHN1FBSdf32XU5xSG0EOoSHxOzNqAGiyAad9CfOu8QNTZPl2DS4kJECxjWPqG7',
    techStack: ['React', 'TypeScript', 'Tailwind'],
    status: 'Published',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'E-commerce API',
    description: 'Scalable backend for online stores.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6j2iBjvaJm5YU_fQSW1mQrPGjmimSLSBhhmWAcB6QzVXmPagkStvhCS0XJ_Je4XJcYtB9RjkE4SnjVoY3Jr5B79sO6dg_4hf9nWAfnTTCnhTWrn9p4VkbyBNOgduXlFiJy8-17TB0QWcPQHIKiY320OjyPhmNIDYID0koDhsEGQvjz-vtgN5b0Jib-y415U24EQSa6wKc0p4umJ_utbt2hxrKpf7p2MTL6XZlbZsOlQjBUV2YiYvbwWLoGFKXzDFEQycFQjVPIUPc',
    techStack: ['Node.js', 'GraphQL'],
    status: 'Published',
    createdAt: '2023-12-10'
  },
  {
    id: '3',
    name: 'Portfolio v1',
    description: 'Original static site portfolio.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMCF4p7Zr-w89bmvxvTsmeLcY2YBhpYNJ60kjApgHtGJ0Lu2RhRmEwsPImsKBcqazoLXtygXsiuqbwSDKaz0dqy9IN4isIwqvlmMQYIdrvrN0iWml3bWGTKsLvFcN2IsSDqYcO1b2arDxWgv7v4kgB__DO5dgWlaREB74VePNXahN_z9me30nlUSSuvAx3g9PHkPSjFic_NMk7ubFSMGW5jbu_enZTeTzxBOs3qbXGzThZl7ciRt_O_sRQku2f7JgPDfqCws9gkq8O',
    techStack: ['HTML', 'CSS', 'JS'],
    status: 'Draft',
    createdAt: '2023-11-05'
  },
  {
    id: '4',
    name: 'Analytics Pro',
    description: 'SaaS analytics tool for marketers.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDghmxLKv_xGy5OOd1qXWOKegTPK8J9LFLJy3Um7M7fkvqgD_yk8GuYJGaYojQlUJQ-Q66kYMF_Hkupd7eEO2tn-iedC1UkXV3-8PGzQFkmYq88aYdEWqdhOo_W0Gw5niD5WDllmKiOUzX9YyzXkLdJTkPkpRKn_A4g0TiSp7iEyyCfabHH6mrrkmyBxeMr7IAy8r3rJtK2cN3ehGIMGIHCXkrRn72pgbl_y3mm3FRLZcSPsck0Jk_KMa2UihntF7wtLPLZ_FAJnGVH',
    techStack: ['Python', 'Django'],
    status: 'Published',
    createdAt: '2023-10-20'
  }
]

// Navigation items cho sidebar
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
  { id: 'profile', label: 'Profile Info', icon: 'person' },
  { id: 'skills', label: 'Skills', icon: 'bolt' },
  { id: 'projects', label: 'Projects', icon: 'folder_open' },
  { id: 'contact', label: 'Contact Info', icon: 'mail' }
]
