// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/css/main.scss'],
    typescript: {
        shim: false
    },
    app: {
        baseURL: '/test-timer/.output/public/'
    },
})
