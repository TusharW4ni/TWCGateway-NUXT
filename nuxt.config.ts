// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/app.css"],
  modules: ["@nuxtjs/tailwindcss", "@prisma/nuxt", "@pinia/nuxt"],
  runtimeConfig: {
    AUTH0_DOMAIN: "",
    AUTH0_CLIENT_ID: "",
    AUTH0_SECRET: "",
    SERVER_BASE_URL: "",
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
});