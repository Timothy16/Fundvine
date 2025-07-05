// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || '"https://agfapi.fundvineberkshire.com',
    public: {
      apiBaseUrl: process.env.API_BASE_URL || '"https://agfapi.fundvineberkshire.com',
    },
    apiSecret: process.env.API_SECRET,
  },
  app: {
    head: {
      title: 'Fundvine',
      meta: [
        { name: 'description', content: 'Fundvine for managing transactions' }
      ],
      link: [
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.jpg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/fontawesome.min.css'
        }
      ],
      script: [
       
      ],
    },
  },
  
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  auth: {
    isEnabled: true,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: process.env.AUTH_ORIGIN || 'http://localhost:3000/api/auth',
    provider: {
      type: 'authjs'
    },
    // globalAppMiddleware: true
  }
})
