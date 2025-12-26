// https://nuxt.com/docs/api/configuration/nuxt-config
import { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  
  modules: [
    '@nuxtjs/google-fonts',
    'vuetify-nuxt-module'
  ],

  vuetify: {
    moduleOptions: {
      importComposables: true,
      styles: true
    },
    vuetifyOptions: {
    theme: {
      themes: {
        default: { dark: true },
        dark: {
          colors: {
            primary: '#7C4DFF', 
            secondary: '#00B8D4',
            accent: '#00E676',
            background: '#0F0F17',
            surface: '#202032ff',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          }
        },
        light: {
          colors: {
            primary: '#6200EE',
            secondary: '#03DAC6',
            background: '#F5F5F7',
            'on-surface': '#263238',
          }
        }
      }
    }
  }
  
  },
  features: {
    inlineStyles: true 
  },

  vite: {
    vue: {
      template: { transformAssetUrls }
    }
  },

  googleFonts: {
    families: {
      Chivo: [400, 700, 900],
      Montserrat: [300, 400, 500, 700]
    },
    download: true
  },

  runtimeConfig: {
    public: {
      omdbApiKey: process.env.OMDB_API_KEY ,
      omdbBaseUrl: 'https://www.omdbapi.com/'
    }
  },
  css: ['~/assets/css/styles.css'],
  
})