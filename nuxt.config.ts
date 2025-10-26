// nuxt.config.ts
import { createResolver } from '@nuxt/kit'
import vuetify from 'vite-plugin-vuetify'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  ssr: false,
  typescript: { shim: false },

  // ★ グローバルCSSはここに集約
  css: [
    'vuetify/styles',                          // ← これが無いとVuetifyが崩れる
    '@mdi/font/css/materialdesignicons.css',   // ← アイコン
    '~/assets/scss/style.scss',                // ← あなたの共通スタイル
  ],

  build: {
    transpile: [
      'vuetify',
      // 'vue3-easy-data-table',    // ← 使うならここに入れることも（後述のclient化推奨）
    ],
  },

  modules: ['@pinia/nuxt', 'nuxt-microcms-module'],

  app: {
    head: {
      htmlAttrs: { lang: 'ja', prefix: 'og: https://ogp.me/ns#' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  hooks: {
    'vite:extendConfig': (config: any) => {
      config.plugins.push(
        vuetify({
          styles: { configFile: resolve('/assets/scss/variables.scss') },
        })
      )
    },
  },

  microCMS: {
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
    apiKey: process.env.MICROCMS_API_KEY,
    target: 'all',
  },
})
