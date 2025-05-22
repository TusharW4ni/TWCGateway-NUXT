// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/app.css"],
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    AUTH0_DOMAIN: "",
    AUTH0_CLIENT_ID: "",
    AUTH0_SECRET: "",
    SERVER_BASE_URL: process.env.SERVER_BASE_URL || "http://localhost:3000/",
    DATABASE_URL: "",
    public: {
      SERVER_BASE_URL: process.env.SERVER_BASE_URL || "http://localhost:3000/",
    },
  },
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  devServer: {
    port: 3000,
    host: "0.0.0.0",
  },
  nitro: {
    experimental: {
      tasks: true,
    },
  },
});
